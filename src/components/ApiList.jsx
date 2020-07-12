import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import { useInfiniteQuery } from "react-query";

/**
 * Fetches list of items
 * Note: load more endpoint will be null unless load more is triggered.
 * That is why we are checking that first. If load more endpoint is null, it is a change from props.
 * @param {string} key
 * @param {object} optionalParams
 * @param {string} optionalParams.endpoint endpoint passed to the list from props
 * @param {string} loadMoreEndpoint endpoint passed from api list when the load more button is selected
 */
const fetchList = (key, { endpoint }, loadMoreEndpoint) =>
  fetch(loadMoreEndpoint || endpoint).then((res) => res.json());

const ApiList = ({
  className,
  title,
  endpoint,
  renderHeader = () => {},
  renderItem = () => {},
  renderLoadMoreButton = () => {},
}) => {
  console.log("+++++++++++++++++++++++++++++");
  console.log(endpoint);
  console.log("+++++============++++++++");
  const {
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    status,
  } = useInfiniteQuery(
    ["apiGET", { endpoint }],
    fetchList,
    {
      getFetchMore: ({ metaData: { links = {} } = {} }, allGroups) =>
        links.next,
    },
    {
      refetchOnWindowFocus: false,
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
            {group.records.map((record) => (
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
          onClick: handleLoadMoreClick,
        })}
    </div>
  );
};

export default ApiList;
