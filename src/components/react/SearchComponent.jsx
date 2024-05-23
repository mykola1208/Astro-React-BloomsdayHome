import React from "react";
import algoliasearch from "algoliasearch/lite";
import { FiFile } from "react-icons/fi";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { ReactSVG } from "react-svg";

const appId = import.meta.env.PUBLIC_ALGOLIA_APP_ID;

function SearchComponent({ securedApiKey }) {
  console.log(securedApiKey);
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
      return algoliaClient.search(requests);
    },
  };
  return (
    <div className="flex items-center">
      <InstantSearch
        searchClient={searchClient}
        indexName="staging_document_text"
      >
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
            <div className="hit-container">
              <FiFile className="hit-icon" />
              <span className="hit-filename">{hit.filename}</span>
              <span className="hit-iname">Documents</span>
            </div>
          )}
        />
      </InstantSearch>
    </div>
  );
}

export default SearchComponent;
