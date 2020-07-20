import { Checkbox, Collapse } from "@baltimorecounty/dotgov-components";

import OptionsCollapse from "./OptionsCollapse";
import React from "react";

const DefaultFilter = ({
  filter: { targetApiField, displayName, options },
  onChange
}) => {
  const visibleFiltersCount = 5;
  const shouldCollapseOptions = options.length > visibleFiltersCount;
  let moreOptions;

  if (shouldCollapseOptions) {
    moreOptions = [...options].splice(visibleFiltersCount);
  }

  return (
    <React.Fragment>
      <Collapse id={targetApiField} header={displayName}>
        {options
          .slice(0, visibleFiltersCount)
          .map(({ label, value, checked }) => {
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
        {shouldCollapseOptions && (
          <OptionsCollapse
            options={moreOptions}
            onChange={onChange}
            targetApiField={targetApiField}
          />
        )}
      </Collapse>
    </React.Fragment>
  );
};

export default DefaultFilter;
