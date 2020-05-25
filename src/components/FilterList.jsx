import {
  BuildApiUrl,
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString,
} from "../common/Filters";
import React, { useEffect, useState } from "react";

import ApiList from "./ApiList.jsx";
import DefaultFilter from "./DefaultFilter.jsx";
import DefaultLoadMoreButton from "./DefaultLoadMoreButton";
import FilterTextInput from "./FilterTextInput";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const FilterList = ({
  title = "",
  renderItem = () => <p>You must specify a renderItem function.</p>,
  renderFilter = (filter, onChange) => (
    <DefaultFilter filter={filter} onChange={onChange} />
  ),
  renderLoadMoreButton = (props) => <DefaultLoadMoreButton {...props} />,
  includeInputFilter = false,
  inputFilterPlaceholder = "Begin typing to filter...",
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  history,
  staticFilters = [],
  staticContext,
  ...props
}) => {
  const [filters, setFilters] = useState(() =>
    UpdateFilters(filtersFromProps, location.search)
  );
  const [apiEndpoint, setApiEndpoint] = useState(() => defaultApiEndpoint);
  const staticFilterString = staticFilters
    .map(({ targetApiField, value }) => `${targetApiField}=${value}`)
    .join("&");

  useEffect(() => {
    setFilters((filters) => UpdateFilters(filters, location.search));

    setApiEndpoint(
      defaultApiEndpoint + BuildApiUrl(location.search, staticFilters)
    );
  }, [location.search]);

  const updateQueryString = (filter) => {
    const [base, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter,
      queryString: currentQueryString,
    });
    history.push(queryString);
  };

  const handleFilterChange = (changeEvent) => {
    const { name, value, checked } = changeEvent;
    updateQueryString({ name, value, checked });
  };

  const handleFilterTextInputChange = (query) => {
    const updatedUrl = UpdateUrlQueryString(apiEndpoint, "filter", query);

    // This disables any browser history updates
    // Since a user could possibly update a ton of entries
    setApiEndpoint(updatedUrl);
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
          {includeInputFilter && (
            <FilterTextInput
              onChange={handleFilterTextInputChange}
              placeholder={inputFilterPlaceholder}
            />
          )}
          <ApiList
            endpoint={apiEndpoint}
            includeInputFilter={includeInputFilter}
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
  /** Includes a text input filter above the list, this does not impact filters in the url */
  includeInputFilter: PropTypes.bool,
  /** Placeholder text for the text input filter */
  inputFilterPlaceholder: PropTypes.string,
  /** allows user to pass in key/value (targetApiField, value) pair to always be applied to the list */
  staticFilters: PropTypes.array,
};

export default withRouter(FilterList);
