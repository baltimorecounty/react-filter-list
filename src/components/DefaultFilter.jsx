import { Checkbox, Collapse } from "@baltimorecounty/dotgov-components";

import React from "react";

const DefaultFilter = ({
  filter: { targetApiField, displayName, options },
  onChange,
}) => (
  <Collapse id={targetApiField} header={displayName}>
    {options.map(({ label, value, checked }) => {
      const id = `${targetApiField}-${value.split(" ").join("-")}`;
      return (
        <Checkbox
          key={`${id}-${checked}`}
          id={id}
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
