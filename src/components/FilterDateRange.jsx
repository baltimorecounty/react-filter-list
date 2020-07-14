import React, { useState } from "react";

import { DateSelector } from "@baltimorecounty/dotgov-components";

const FilterDateSelector = ({ onChange = () => {}, ...rest }) => {
  return (
    <div className="input-filter-form">
      <DateSelector title="Start Date" {...rest} />
    </div>
  );
};

export default FilterDateSelector;
