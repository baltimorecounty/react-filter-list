import { Checkbox } from "@baltimorecounty/dotgov-components";
import React from "react";

const Filters = ({ filters = [], handleFilterChange = () => {} }) => (
  <>
    {filters.map(({ targetApiField, displayName, options = [] }) => (
      <div key={targetApiField}>
        <h3>{displayName}</h3>
        {options.map(({ label, value }) => (
          <Checkbox
            key={`${displayName}-${value}`}
            id={`${displayName}-${value}`}
            name={targetApiField}
            onClick={handleFilterChange}
            label={label}
            value={value}
          />
        ))}
      </div>
    ))}
  </>
);

export default Filters;
