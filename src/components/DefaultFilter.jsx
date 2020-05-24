import { Button, Checkbox, Collapse } from "@baltimorecounty/dotgov-components";

import OptionsCollapse from "./OptionsCollapse";
import React from "react";

const DefaultFilter = ({
  filter: { targetApiField, displayName, options },
  onChange,
}) => {
  const shouldCollapseOptions = options.length > 0;
  let moreOptions;

  if (shouldCollapseOptions) {
    moreOptions = [...options].splice(5);
  }

  return (
    <Collapse id={targetApiField} header={displayName}>
      {options.slice(0, 5).map(({ label, value, checked }) => {
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
      {moreOptions.length > 0 && (
        <OptionsCollapse
          options={moreOptions}
          onChange={onChange}
          targetApiField={targetApiField}
        />
      )}
    </Collapse>
  );
};

export default DefaultFilter;
