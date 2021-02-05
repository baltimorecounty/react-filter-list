import {
  Button,
  Checkbox,
  CheckedInputGroup,
  RadioButton,
} from "@baltimorecounty/dotgov-components";
import React, { useState } from "react";

const OptionsCollapse = ({
  options = [],
  type = "checkbox",
  targetApiField = "",
  onChange = () => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonStyles = {
    paddingLeft: "0",
    paddingRight: "0",
  };

  return (
    <div>
      {!isExpanded && (
        <Button
          className="dg_button-link plus-text-icon"
          onClick={handleToggleClick}
          text="Show More"
          style={buttonStyles}
        />
      )}

      {isExpanded && (
        <>
          {type === "checkbox"} ?
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
          :
          <CheckedInputGroup>
            {options.map(({ label, value, checked }) => {
              const id = `${targetApiField}-${value.split(" ").join("-")}`;
              return (
                <RadioButton
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
          </CheckedInputGroup>
          <Button
            className="dg_button-link minus-text-icon"
            onClick={handleToggleClick}
            text="Show Less"
            style={buttonStyles}
          />
        </>
      )}
    </div>
  );
};

export default OptionsCollapse;

<CheckedInputGroup
  title="Is your refrigerator running?"
  hint="Select the most appropriate answer"
>
  <RadioButton
    id="refrigerator-running-yes"
    name="refrigerator-running"
    label="Yes"
    value="yes"
  />
  <RadioButton
    id="refrigerator-running-no"
    name="refrigerator-running"
    label="No"
    value="no"
  />
  <RadioButton
    id="refrigerator-running-maybe"
    name="refrigerator-running"
    label="Maybe"
    value="maybe"
    disabled
  />
</CheckedInputGroup>;
