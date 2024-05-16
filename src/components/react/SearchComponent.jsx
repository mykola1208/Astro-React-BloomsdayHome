import React from "react";
import algoliasearch from "algoliasearch/lite";
import { FiFile } from "react-icons/fi";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

const appId = import.meta.env.PUBLIC_ALGOLIA_APP_ID;

function SearchComponent({ securedApiKey }) {
  console.log(securedApiKey);
  const algoliaClient = algoliasearch(
    appId,
    securedApiKey
  );
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
    <InstantSearch
      searchClient={searchClient}
      indexName="staging_document_text"
    >
      <SearchBox
        placeholder="What can we help you find...."
        className="bg-putty placeholder-darkgreen ais-SearchBox-border block w-full pe-10 pl-9 py-3.5"
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
  );
}

export default SearchComponent;
