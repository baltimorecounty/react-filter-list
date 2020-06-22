import React from "react";

const Filters = ({
  filters = [],
  handleFilterChange = () => {},
  renderFilter = () => {},
}) => (
  <>
    {filters
      // Remove filters without options
      .filter(({ options = [] }) => options.length > 0)
      .map((filter) => (
        <div key={filter.targetApiField}>
          {renderFilter(filter, handleFilterChange)}
        </div>
      ))}
  </>
);

export default Filters;
