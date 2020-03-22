import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import RecordsMessage from "./RecordsMessage";
import { useInfiniteQuery } from "react-query";

const fetchList = (key, { endpoint }) =>
  fetch(endpoint).then(res => res.json());

const ApiList = ({ title, endpoint, renderItem = () => {} }) => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMor
  } = useInfiniteQuery(["apiGET", { endpoint }], fetchList, {
    getFetchMore: ({ metaData: { links = {} } = {} }, allGroups) => links.next
  });

  if (!data) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p>Something went wrong loading {title}.</p>;
  }

  const {
    records = [],
    metaData: { totalRecords = 0, links: { next } = {} } = {}
  } = data;

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
      {next && (
        <button type="button" type="button" disabled={isFetching}>
          Load More
        </button>
      )}
    </>
  );
};

export default ApiList;
