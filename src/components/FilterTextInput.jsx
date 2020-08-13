import React, { useState } from "react";

import { TextInput } from "@baltimorecounty/dotgov-components";
import { useDebouncedCallback } from "use-debounce";

const FilterTextInput = ({ onChange = () => {}, isCleared, ...rest }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedCallback] = useDebouncedCallback((value) => {
    onChange(value);
  }, 300);

  if (isCleared) {
    setInputValue("");
  }

  const handleChange = (changeEvent) => {
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
        value={inputValue}
        type="search"
        {...rest}
      />
    </div>
  );
};

export default FilterTextInput;
