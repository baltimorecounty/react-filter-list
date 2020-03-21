import React from "react";

const RecordsMessage = ({
  count = 0,
  renderMessage = ({ count }) => `Showing ${count} records`,
  ...rest
}) => {
  return <p {...rest}>{renderMessage({ count })}</p>;
};

export default RecordsMessage;
