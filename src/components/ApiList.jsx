import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import RecordsMessage from "./RecordsMessage";
import { useInfiniteQuery } from "react-query";

const fetchList = (key, { endpoint }, loadMoreEndpoint) =>
  fetch(loadMoreEndpoint || endpoint).then(res => res.json());

const ApiList = ({ title, endpoint, renderItem = () => {} }) => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useInfiniteQuery(["apiGET", { endpoint }], fetchList, {
    getFetchMore: ({ metaData: { links = {} } = {} }, allGroups) => links.next
  });

  if (!data) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p>Something went wrong loading {title}.</p>;
  }

  const { metaData: { totalRecords = 0 } = {} } = data[0] || {};

  const handleLoadMoreClick = () => {
    fetchMore();
  };

  return (
    <>
      <RecordsMessage count={totalRecords} />
      <div className="items">
        {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.records.map(record => (
              <div key={record.id}>{renderItem(record)}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <RecordsMessage count={totalRecords} />
      {canFetchMore && (
        <button
          type="button"
          disabled={isFetching}
          onClick={handleLoadMoreClick}
        >
          {isFetchingMore ? "Loading more..." : "Load More"}
        </button>
      )}
    </>
  );
};

export default ApiList;
