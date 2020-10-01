import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import { useInfiniteQuery, setFocusHandler } from "react-query";

/**
 * Fetches list of items
 * Note: load more endpoint will be null unless load more is triggered.
 * That is why we are checking that first. If load more endpoint is null, it is a change from props.
 * @param {string} key
 * @param {object} optionalParams
 * @param {string} optionalParams.endpoint endpoint passed to the list from props
 * @param {string} loadMoreEndpoint endpoint passed from api list when the load more button is selected
 */
const fetchList = (key, { endpoint }, loadMoreEndpoint) => {

  if (loadMoreEndpoint) {
    if (endpoint.indexOf("?") > -1) {
      let splitString = loadMoreEndpoint.split("?");
      let pageSplit = splitString[1].split("&");
      endpoint = endpoint + "&" + pageSplit[0];
    } else {
      endpoint = loadMoreEndpoint;
    }
  }
  return fetch(endpoint).then(res => res.json());
};

// Default behavior of the FocusHandler is to re-render the component when the window
// regains focus. This causes unnecessary extra API calls and introduces slowness.
// Overriding behavior so it does nothing when the windows regains focus.
// Reference: https://www.npmjs.com/package/react-query/v/2.4.3#custom-window-focus-event
setFocusHandler(() => {
  return () => {};
});

const ApiList = ({
  className,
  title,
  endpoint,
  renderHeader = () => {},
  renderItem = () => {},
  renderLoadMoreButton = () => {}
}) => {
  const {
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    status
  } = useInfiniteQuery(
    ["apiGET", { endpoint }],
    fetchList,
    {
      getFetchMore: ({ metaData: { links = {} } = {} }, allGroups) => links.next
    },
    {
      refetchOnWindowFocus: false
    }
  );

  if (status === "loading") {
    return <p>Loading {title}...</p>;
  }

  if (status === "error") {
    return (
      <p>
        Something went wrong with {title}. Please try again in a few minutes.
      </p>
    );
  }

  const { metaData: { totalRecords: count = 0 } = {} } = data[0] || {};

  const handleLoadMoreClick = () => {
    fetchMore();
  };

  return (
    <div>
      {renderHeader(count)}
      <div className={className}>
        {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.records.map(record => (
              <React.Fragment key={record.id}>
                {renderItem(record)}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
      {canFetchMore &&
        renderLoadMoreButton({
          isFetching,
          isFetchingMore,
          onClick: handleLoadMoreClick
        })}
    </div>
  );
};

export default ApiList;
