import React from "react";
import RecordsMessage from "./RecordsMessage";
import { useInfiniteQuery } from "react-query";
import { FetchList } from "../common/Fetch";

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
    FetchList,
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
