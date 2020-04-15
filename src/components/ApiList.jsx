import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import RecordsMessage from "./RecordsMessage";
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
  title,
  endpoint,
  renderItem = () => {},
  renderLoadMoreButton = () => {},
}) => {
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

  const { metaData: { totalRecords = 0 } = {} } = data[0] || {};

  const handleLoadMoreClick = () => {
    fetchMore();
  };

  return (
    <>
      <RecordsMessage
        count={totalRecords}
        renderMessage={({ count }) => `${count} results`}
      />
      <div className="items">
        {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.records.map((record) => (
              <div key={record.id}>{renderItem(record)}</div>
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
    </>
  );
};

export default ApiList;
