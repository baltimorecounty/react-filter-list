import React, { useState } from "react";

import { DateSelector, Fieldset } from "@baltimorecounty/dotgov-components";

const FilterDateSelector = (props) => {
  const {
    label,
    name,
    id,
    selected,
    onChange,
    maxDate,
    minDate,
    ...rest
  } = props;
  console.log('selected:' + selected);
//  console.log('selected1:' + selected1);
  console.log(props);
  return (
  
    <div className="input-filter-form">
      <DateSelector
        label={label}
        name={name}
        id={id}
        selected={selected}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
       // {...rest}
      />
    </div>
  );
};

export default FilterDateSelector;
