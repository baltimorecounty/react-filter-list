import React from "react";

const Filters = ({
  filters = [],
  handleFilterChange = () => {},
  renderFilter = () => {},
}) => (
  <>
    {filters
      .filter(({ isVisible }) => isVisible !== false)
      .map((filter) => (
        <div key={filter.targetApiField}>
          {renderFilter(filter, handleFilterChange)}
        </div>
      ))}
  </>
);

export default Filters;
