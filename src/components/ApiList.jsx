import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React, { useState } from "react";

import RecordsMessage from "./RecordsMessage";
import { useQuery } from "react-query";

const fetchList = (key, { endpoint }) =>
  fetch(endpoint).then(res => res.json());

const ApiList = ({
  title,
  endpoint: endpointFromProps,
  renderItem = () => {}
}) => {
  const [endpoint, setEndpoint] = useState(endpointFromProps);
  const { data, error } = useQuery(["apiGET", { endpoint }], fetchList);

  if (!data) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p>Something went wrong loading {title}.</p>;
  }

  const {
    records = [],
    metaData: { links: { next } = {}, totalRecords = 0 } = {}
  } = data;

  const handleMoreClick = () => {
    setEndpoint(next);
  };

  return (
    <>
      <RecordsMessage count={totalRecords} />
      <div className="items">{records.map(renderItem)}</div>
      <RecordsMessage count={totalRecords} />
      {next && <button onClick={handleMoreClick}>Load More</button>}
    </>
  );
};

export default ApiList;
