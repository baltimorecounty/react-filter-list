import { Checkbox, Collapse } from "@baltimorecounty/dotgov-components";

import React from "react";

const DefaultFilter = ({
  filter: { targetApiField, displayName, options },
  onChange
}) => (
  <Collapse id={targetApiField} header={displayName}>
    {options.map(({ label, value }) => {
      return (
        <Checkbox
          key={`${displayName}-${value}`}
          id={`${displayName}-${value}`}
          name={targetApiField}
          onClick={onChange}
          label={label}
          value={value}
        />
      );
    })}
  </Collapse>
);

export default DefaultFilter;
