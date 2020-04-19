import { Checkbox, Collapse } from "@baltimorecounty/dotgov-components";

import React from "react";

const DefaultFilter = ({
  filter: { targetApiField, displayName, options },
  onChange,
}) => (
  <Collapse id={targetApiField} header={displayName}>
    {options.map(({ label, value, checked }) => {
      return (
        <Checkbox
          key={`${displayName}-${value}-${checked}`}
          id={`${displayName}-${value}`}
          name={targetApiField}
          onChange={onChange}
          label={label}
          value={value}
          checked={checked}
        />
      );
    })}
  </Collapse>
);

export default DefaultFilter;
