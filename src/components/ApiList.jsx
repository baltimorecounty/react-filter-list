import React from "react";
import axios from "axios";
import fetch from "node-fetch";
import { useQuery } from "react-query";

const fetchList = (key, { endpoint }) => fetch(endpoint);

const ApiList = ({ title, endpoint, renderItem = () => {} }) => {
  const { data: response, error } = useQuery(
    ["apiGET", { endpoint }],
    fetchList
  );

  if (!response) {
    return <p>Loading {title}...</p>;
  }

  if (error) {
    return <p>Something went wrong loading {title}.</p>;
  }

  const { records = [], metaData = {} } = response.data;

  return (
    <>
      <div className="items">{records.map(renderItem)}</div>
    </>
  );
};

export default ApiList;
