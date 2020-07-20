import React from "react";

const RecordsMessage = ({
  count = 0,
  renderMessage = ({ count }) => `View ${count} results`,
  ...rest
}) => {
  return <p {...rest}>{renderMessage({ count })}</p>;
};

export default RecordsMessage;
