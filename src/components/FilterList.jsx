import React, { useState } from "react";

import ApiList from "./ApiList.jsx";
import Filters from "./Filters.jsx";
import { UpdateQueryString } from "../common/Filters";

const FilterList = ({
  title = "",
  renderItem = props => <div {...props} />,
  filters = [],
  apiEndpoint: defaultApiEndpoint,
  ...props
}) => {
  const [apiEndpoint, setApiEndpoint] = useState(defaultApiEndpoint);

  const handleFilterChange = changeEvent => {
    const { name, value, checked } = changeEvent.target;
    const [baseApiEndpoint, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter: { name, value, checked },
      queryString: currentQueryString
    });

    setApiEndpoint(`${baseApiEndpoint}${queryString}`);
  };

  return (
    <div {...props}>
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <Filters handleFilterChange={handleFilterChange} filters={filters} />
        </div>
        <div className="col-md-9 col-xs-12">
          <ApiList
            endpoint={apiEndpoint}
            title={title}
            renderItem={renderItem}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterList;
