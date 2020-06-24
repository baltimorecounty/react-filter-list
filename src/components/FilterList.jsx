import React, { useEffect, useState } from "react";
import { ToOdataFilter, Update } from "../common/ODataFilter";
import {
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString,
} from "../common/Filters";

import ApiList from "./ApiList.jsx";
import DefaultFilter from "./DefaultFilter.jsx";
import DefaultLoadMoreButton from "./DefaultLoadMoreButton";
import FilterTextInput from "./FilterTextInput";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
import RecordsMessage from "./RecordsMessage";
import useFilters from "../hooks/useFilters";
import { withRouter } from "react-router-dom";

const FilterList = ({
  title = "",
  listContainerClassName = "list",
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
  includeInputFilter = false,
  inputFilterPlaceholder = "Begin typing to filter...",
  inputFilterFields = [],
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  orderBy = [],
  history,
  staticContext,
  ...props
}) => {
  const [
    { uiFilters, odataQuery, apiEndpoint },
    { setFilters, setApiEndpoint },
  ] = useFilters(
    defaultApiEndpoint,
    location.search,
    filtersFromProps,
    orderBy
  );

  useEffect(() => {
    const { queryString } = odataQuery;
    setApiEndpoint(defaultApiEndpoint + queryString);
  }, [uiFilters, odataQuery]);

  const updateQueryString = (filter) => {
    const updateOdataQuery = Update({
      checkboxFilter: filter,
      odataQuery,
      orderBy,
    });
    const updatedUiFilters = UpdateFilters(uiFilters, updateOdataQuery);

    setFilters({
      uiFilters: updatedUiFilters,
      odataQuery: updateOdataQuery,
    });

    // only update browser history checkbox filters
    // otherwise every time you type for the text change
    // there were be loads of history records
    history.push(updateOdataQuery.queryString);
  };

  const handleFilterChange = (changeEvent) => {
    const { name, value, checked } = changeEvent;
    updateQueryString({ name, value, checked });
  };

  const handleFilterTextInputChange = (query) => {
    const updatedFilters = Update({
      textFilter: { fieldNames: inputFilterFields, value: query },
      odataQuery,
      orderBy,
    });
    const updatedUiFilters = UpdateFilters(uiFilters, updatedFilters);

    setFilters({
      uiFilters: updatedUiFilters,
      odataQuery: updatedFilters,
    });
  };

  return (
    <div {...props}>
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <Filters
            renderFilter={renderFilter}
            handleFilterChange={handleFilterChange}
            filters={uiFilters}
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
            className={listContainerClassName}
            endpoint={apiEndpoint}
            renderHeader={renderListHeader}
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
  /** className attribute for the list container */
  listContainerClassName: PropTypes.string,
  /** A list of fields to search in the text input */
  inputFilterFields: PropTypes.array,
  /** an array of fields you wish to order by, this is static and asc */
  orderBy: PropTypes.array,
};

export default withRouter(FilterList);
