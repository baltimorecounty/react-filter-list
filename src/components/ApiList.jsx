import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import RecordsMessage from "./RecordsMessage";
import { useQuery } from "react-query";

const fetchList = (key, { endpoint }) =>
  fetch(endpoint).then(res => res.json());

const ApiList = ({ title, endpoint, renderItem = () => {} }) => {
  const { data, error } = useQuery(["apiGET", { endpoint }], fetchList);

  if (!data) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p>Something went wrong loading {title}.</p>;
  }

  const { records = [], metaData: { totalRecords = 0 } = {} } = data;

  return (
    <>
      <RecordsMessage count={totalRecords} />
      <div className="items">{records.map(renderItem)}</div>
      <RecordsMessage count={totalRecords} />
    </>
  );
};

export default ApiList;
