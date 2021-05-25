import React from "react";
import "./styles/home.css";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "./config/config-helper";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase,
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig(),
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export default function App() {
  return (
    <div>
      <div className="main">
        <div className="head">LyfSaver</div>
        <div className="subtitle">Saving a life is our first priority</div>
      </div>
      <SearchProvider config={config}>
        <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
          {({ wasSearched }) => {
            return (
              <div className="App">
                <ErrorBoundary>
                  <Layout
                    header={<SearchBox autocompleteSuggestions={true} />}
                    sideContent={
                      <div>
                        {wasSearched && (
                          <Sorting
                            label={"Sort by"}
                            sortOptions={buildSortOptionsFromConfig()}
                          />
                        )}
                        {getFacetFields().map((field) => (
                          <Facet key={field} field={field} label={field} />
                        ))}
                      </div>
                    }
                    bodyContent={
                      <Results
                        titleField={getConfig().titleField}
                        urlField={getConfig().urlField}
                        shouldTrackClickThrough={true}
                      />
                    }
                    bodyHeader={
                      <React.Fragment>
                        {wasSearched && <PagingInfo />}
                        {wasSearched && <ResultsPerPage />}
                      </React.Fragment>
                    }
                    bodyFooter={<Paging />}
                  />
                </ErrorBoundary>
              </div>
            );
          }}
        </WithSearch>
      </SearchProvider>
      <footer className="footer">
        All copyrights are issued to <strong>@BinaryBeast</strong> 2021. Made with &hearts; Elastic Search
      </footer>
    </div>
  );
}
