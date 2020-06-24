import React, { useState } from "react";

import { ToOdataFilter } from "../common/ODataFilter";
import { UpdateFilters } from "../common/Filters";
import buildQuery from "odata-query";

const useFilters = (
  defaultApiEndpoint,
  initialQueryString = "",
  initialFilters,
  orderBy
) => {
  const initialOdataFilterObj = ToOdataFilter(initialQueryString, orderBy);
  const queryString = buildQuery(initialOdataFilterObj);
  const initialOdataFilters = {
    filter: initialOdataFilterObj.filter,
    queryString,
  };
  const initialUiFilters = UpdateFilters(initialFilters, initialOdataFilterObj);
  const [{ uiFilters, odataQuery }, setFilters] = useState(() => ({
    uiFilters: initialUiFilters,
    odataQuery: initialOdataFilters,
  }));
  const [apiEndpoint, setApiEndpoint] = useState(
    () => defaultApiEndpoint + queryString
  );

  return [
    { uiFilters, odataQuery, apiEndpoint },
    { setFilters, setApiEndpoint },
  ];
};

export default useFilters;
