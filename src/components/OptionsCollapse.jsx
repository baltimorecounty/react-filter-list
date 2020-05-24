import { Button, Checkbox } from "@baltimorecounty/dotgov-components";
import React, { useState } from "react";

const OptionsCollapse = ({
  options = [],
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
