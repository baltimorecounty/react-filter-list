import React, { useEffect, useState } from "react";
import { UpdateFilters, UpdateQueryString } from "../common/Filters";

import ApiList from "./ApiList.jsx";
import DefaultFilter from "./DefaultFilter.jsx";
import DefaultLoadMoreButton from "./DefaultLoadMoreButton";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
import RecordsMessage from "./RecordsMessage";
import { withRouter } from "react-router-dom";

const FilterList = ({
  title = "",
  renderItem = () => <p>You must specify a renderItem function.</p>,
  renderFilter = (filter, onChange) => (
    <DefaultFilter filter={filter} onChange={onChange} />
  ),
  renderListHeader = (count) => (
    <div className="list-header">
      <RecordsMessage count={count} />
    </div>
  ),
  renderLoadMoreButton = (props) => <DefaultLoadMoreButton {...props} />,
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  history,
  staticContext,
  ...props
}) => {
  const [filters, setFilters] = useState(() =>
    UpdateFilters(filtersFromProps, location.search)
  );
  const [apiEndpoint, setApiEndpoint] = useState(() => defaultApiEndpoint);

  useEffect(() => {
    setFilters((filters) => UpdateFilters(filters, location.search));
    setApiEndpoint(defaultApiEndpoint + location.search);
  }, [location.search]);

  const handleFilterChange = (changeEvent) => {
    const { name, value, checked } = changeEvent;
    const [base, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter: { name, value, checked },
      queryString: currentQueryString,
    });
    history.push(queryString);
  };

  return (
    <div {...props}>
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <Filters
            renderFilter={renderFilter}
            handleFilterChange={handleFilterChange}
            filters={filters}
          />
        </div>
        <div className="col-md-9 col-xs-12">
          <ApiList
            endpoint={apiEndpoint}
            renderHeader={renderListHeader}
            renderItem={renderItem}
            renderLoadMoreButton={renderLoadMoreButton}
            title={title}
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
  /**
   * Function to control the display of the load more button
   * The function is provided isFetching, onClick, isFetchingMore props
   */
  renderLoadMoreButton: PropTypes.func,
  /** Function to display a single filter with options.
   * The function is provided  all available information about that filter, and the change event.
   */
  renderFilter: PropTypes.func,
  /** List of filters. A filter contains `targetApiField`, `displayName`, and list of options { label, value } */
  filters: PropTypes.array.isRequired,
  /** Fully qualified api url plus endpoint targeting for the list. Ex. https://mycoolsite/api/news  */
  apiEndpoint: PropTypes.string.isRequired,
};

export default withRouter(FilterList);
