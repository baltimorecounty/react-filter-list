import React from "react";

const RecordsMessage = ({
  count = 0,
  renderMessage = ({ count }) =>
    count === 0
      ? `Viewing ${count} results. Try updating your filter criteria`
      : `Viewing ${count} results`,
  ...rest
}) => {
  return <p {...rest}>{renderMessage({ count })}</p>;
};

export default RecordsMessage;
