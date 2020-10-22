import React, { useState, useEffect } from "react";

import { TextInput } from "@baltimorecounty/dotgov-components";
import { useDebouncedCallback } from "use-debounce";
import { json } from "@rollup/plugin-json";

const FilterTextInput = ({
  onChange = () => {},
  isClear,
  filterText,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(filterText);
  const [debouncedCallback] = useDebouncedCallback(value => {
    onChange(value);
  }, 300);
  useEffect(() => {
    if (isClear) {
      setInputValue("");
    }
  }, [isClear]);

  const handleChange = changeEvent => {
    const { value = "" } = changeEvent.target;
    setInputValue(value);
    debouncedCallback(value);
  };

  return (
    <div className="input-filter-form">
      <TextInput
        id="input-filter"
        label=""
        placeholder=""
        onChange={handleChange}
        value={!isClear ? inputValue : ""}
        type="search"
        {...rest}
      />
    </div>
  );
};

export default FilterTextInput;
