import React from "react";

const Filters = ({
  filters = [],
  handleFilterChange = () => {},
  renderFilter = () => {},
}) => (
  <>
    {filters
      .filter(({ options = [] }) => options.length > 0)
      .map((filter) => (
        <div key={filter.targetApiField}>
          {renderFilter(filter, handleFilterChange)}
        </div>
      ))}
  </>
);

export default Filters;
