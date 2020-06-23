import React, { useState } from "react";

import { ToOdataFilter } from "../common/ODataFilter";
import { UpdateFilters } from "../common/Filters";
import buildQuery from "odata-query";

const useFilters = (
  defaultApiEndpoint,
  initialQueryString = "",
  initialFilters
) => {
  const initialOdataFilterObj = ToOdataFilter(initialQueryString);
  const queryString = buildQuery(initialOdataFilterObj);
  const initialOdataFilters = {
    filters: initialOdataFilterObj,
    queryString,
  };
  const initialUiFilters = UpdateFilters(initialFilters, initialOdataFilterObj);
  const [{ uiFilters, odataFilters }, setFilters] = useState(() => ({
    uiFilters: initialUiFilters,
    odataFilters: initialOdataFilters,
  }));
  const [apiEndpoint, setApiEndpoint] = useState(
    () => defaultApiEndpoint + queryString
  );

  return [
    { uiFilters, odataFilters, apiEndpoint },
    { setFilters, setApiEndpoint },
  ];
};

export default useFilters;
