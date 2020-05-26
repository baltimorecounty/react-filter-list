import Fetch from "../common/Fetch";
import React from "react";
import { useQuery } from "react-query";

const Filters = ({
  filters: filtersFromProps,
  handleFilterChange = () => {},
  renderFilter = () => {},
}) => {
  const shouldFetchFilters = typeof filtersFromProps === "string";
  const { data, status } = useQuery(
    shouldFetchFilters && [filtersFromProps],
    Fetch,
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(status, data);

  if (status === "loading") {
    return <p>Loading Filters...</p>;
  }

  if (status === "error") {
    return (
      <p>
        Something went wrong loading filters, try again in a couple of minutes.
      </p>
    );
  }

  console.log(data);

  return (
    <>
      {(shouldFetchFilters ? data : filtersFromProps).map((filter) => (
        <div key={filter.targetApiField}>
          {renderFilter(filter, handleFilterChange)}
        </div>
      ))}
    </>
  );
};

export default Filters;
