import React, { useState } from "react";

import ApiList from "./ApiList.jsx";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
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

FilterList.propTypes = {
  /** Name of the collection of data, Ex. Baltimore County News */
  title: PropTypes.string.isRequired,
  /**
   * Function to display a single list item.
   * The function is provided  all available information about that item.
   */
  renderItem: PropTypes.func.isRequired,
  /** List of filters. A filter contains `targetApiField`, `displayName`, and list of options { label, value } */
  filters: PropTypes.array.isRequired,
  /** Fully qualified api url plus endpoint targeting for the list. Ex. https://mycoolsite/api/news  */
  apiEndpoint: PropTypes.string.isRequired
};

export default FilterList;
