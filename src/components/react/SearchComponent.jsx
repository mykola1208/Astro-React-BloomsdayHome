import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { FiFile, FiImage } from "react-icons/fi";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { ReactSVG } from "react-svg";
import { createApolloClient } from "../../apollo/client";
import { GET_DOCUMENT_TASKS } from "../../apollo/queries/getDocumentTask";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const appId = import.meta.env.PUBLIC_ALGOLIA_APP_ID;
const indexPrefix = appId === "E6DMXN0M5J" ? "staging" : "production";
const searchIndex = `${indexPrefix}_documents`;

function SearchComponent({ securedApiKey }) {
  const [loaded, setLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [lodingFile, setLodingFile] = useState("");
  const { createClient } = createApolloClient();
  const algoliaClient = algoliasearch(appId, securedApiKey);
  const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: "",
            params: "",
          })),
        });
      }
      const updatedRequests = requests.map((req) => ({
        ...req,
        params: {
          ...req.params,
          distinct: true,
        },
      }));

      return algoliaClient.search(updatedRequests);
    },
  };

  function getFileExtension(filename) {
    const extension = filename.substring(
      filename.lastIndexOf(".") + 1,
      filename.length
    );
    return extension;
  }

  const handleSearch = async (hit) => {
    setLodingFile(hit.filename);
    setShowSpinner(true);
    const client = await createClient();
    const { data } = await client.query({
      query: GET_DOCUMENT_TASKS,
      variables: {
        uuid: hit.objectID,
      },
    });

    const { task_stage, title } = data.documents_by_pk.documents_tasks[0].task;
    localStorage.setItem("activeAccordionContent", title);
    navigate(`/documents/${task_stage.replace(/_/g, "-")}/${hit.filename}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  return (
    <div
      className="flex items-center"
      style={{ visibility: loaded ? "visible" : "hidden" }}
    >
      <InstantSearch searchClient={searchClient} indexName={searchIndex}>
        <SearchBox
          submitIconComponent={() => <ReactSVG src="/icons/search.svg" />}
          placeholder="What can we help you find...."
          className="bg-putty placeholder-darkgreen ais-SearchBox-border w-full pe-5 pl-9 py-3.5"
          classNames={{
            form: "flex ",
          }}
        />
        <Hits
          hitComponent={({ hit }) => (
            <button onClick={() => handleSearch(hit)} className="flex">
              <div className="hit-container">
                {getFileExtension(hit.filename) === "pdf" ? (
                  <FiFile className="hit-icon" />
                ) : (
                  <FiImage className="hit-icon" />
                )}

                <span className="hit-filename">{hit.filename}</span>
                <span className="hit-iname">
                  {getFileExtension(hit.filename) === "pdf"
                    ? "Document"
                    : "Image"}
                </span>
              </div>
              {showSpinner && lodingFile === hit.filename && (
                <ReactSVG src="/icons/spinner.svg" className="ml-16 mt-1" />
              )}
            </button>
          )}
        />
      </InstantSearch>
    </div>
  );
}

export default SearchComponent;
