import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetch = (key, { endpoint }) => axios.get(endpoint);

const ApiList = ({ title, endpoint, renderItem = () => {} }) => {
  const { data: response, error } = useQuery(["apiGET", { endpoint }], fetch);

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
