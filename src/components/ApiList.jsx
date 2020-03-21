import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

import React from "react";
import { useQuery } from "react-query";

const fetchList = (key, { endpoint }) =>
  fetch(endpoint).then(res => res.json());

const ApiList = ({ title, endpoint, renderItem = () => {} }) => {
  const { data, error } = useQuery(["apiGET", { endpoint }], fetchList);

  console.log("d", data);

  if (!data) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p>Something went wrong loading {title}.</p>;
  }

  console.log(data);

  const { records = [], metaData = {} } = data;

  return (
    <>
      <div className="items">{records.map(renderItem)}</div>
    </>
  );
};

export default ApiList;
