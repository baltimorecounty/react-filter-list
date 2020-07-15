import React, { useEffect, useState } from "react";
import {
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString,
  FormatDateString,
} from "../common/Filters";
import { button, Fieldset } from "@baltimorecounty/dotgov-components";

import ApiList from "./ApiList.jsx";
import DefaultFilter from "./DefaultFilter.jsx";
import DefaultLoadMoreButton from "./DefaultLoadMoreButton";
import FilterTextInput from "./FilterTextInput";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
import RecordsMessage from "./RecordsMessage";
import { withRouter } from "react-router-dom";
import FilterDateSelector from "./FilterDateRange";
import { get } from "http";

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
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  history,
  staticContext,
  ...props
}) => {
  let filterDateValue = filtersFromProps.filter(
    (name) => name.targetApiField == "FilterDate"
  );

  let toFromDatePart = filterDateValue[0].value.split(",");
  const [fromDate, setFromDate] = useState(new Date(toFromDatePart[0]) || null);
  const [toDate, setToDate] = useState(new Date(toFromDatePart[1]) || null);
  const fromDateId = `fromDate`;
  const toDateId = `toDate`;
console.log('fromDate:' + fromDate);
  const staticFilterQueryString = filtersFromProps
    .filter(({ value }) => value)
    .map(({ targetApiField, value }) => `${targetApiField}=${value}`)
    .join("&");
  const [filters, setFilters] = useState(() =>
    UpdateFilters(filtersFromProps, location.search)
  );

  const [apiEndpoint, setApiEndpoint] = useState(
    () =>
      (defaultApiEndpoint = staticFilterQueryString
        ? defaultApiEndpoint + "?" + staticFilterQueryString
        : defaultApiEndpoint)
  );
  useEffect(() => {
    setFilters((filters) => UpdateFilters(filters, location.search));
    setApiEndpoint(
      defaultApiEndpoint +
        location.search +
        (location.search.indexOf("?") > -1 ? "&" : "?") +
        staticFilterQueryString
    );
  }, [location.search]);

  const updateQueryString = (filter) => {
    const [base, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter,
      queryString: currentQueryString.replace(staticFilterQueryString, ""),
    });
    history.push(location.pathname + queryString);
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

  const handleFromDateChange = (date) => {
   // alert("handleFromDateChange");
    setFromDate(date);
    
    var fromToDateFormattedValue =
      FormatDateString(date) + "," + FormatDateString(toDate);
    const updatedUrl = UpdateUrlQueryString(
      apiEndpoint,
      "FilterDate",
      fromToDateFormattedValue
    );

    // // This disables any browser history updates
    // // Since a user could possibly update a ton of entries
    // //TODO: if you uncomment this line , it will change the url ???
    // // const [base, queryString] = updatedUrl.split("?");
    // // history.push(location.pathname + "?" + queryString);

    setApiEndpoint(updatedUrl);
  };

  const handleToDateChange = (date) => {
    //alert("handleToDateChange");
    setToDate(date);
    var fromToDateFormattedValue =
      FormatDateString(fromDate) + "," + FormatDateString(date);

    const updatedUrl = UpdateUrlQueryString(
      apiEndpoint,
      "FilterDate",
      fromToDateFormattedValue
    );

    // This disables any browser history updates
    // Since a user could possibly update a ton of entries
    //TODO: if you uncomment this line , it will change the url ???
    // const [base, queryString] = updatedUrl.split("?");
    // history.push(location.pathname + "?" + queryString);

    setApiEndpoint(updatedUrl);
  };
  const clearFilter = () => {
    history.push(location.pathname);
  };
  return (
     //{...props}
     <div > 
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <div>
            <Filters
              renderFilter={renderFilter}
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>

          <div>
            {/* <Fieldset title="Filter by Date"> */}
              <FilterDateSelector
                name={fromDateId}
                id={fromDateId}
                selected={fromDate}
               onChange={handleFromDateChange}
                //onChange={date=> setFromDate(date)}
                maxDate={toDate}
                label="Start Date"
              />
              <FilterDateSelector
                name={toDateId}
                id={toDateId}
                selected={toDate}
                onChange={handleToDateChange}
                minDate={fromDate}
                maxDate={new Date()}
                label="End Date"
              />
            {/* </Fieldset> */}
          </div>
          <div className="dg_card__footer">
            <button type="button" onClick={clearFilter} className="dg_button">
              Clear filters
            </button>
          </div>
        </div>
        <div></div>
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
};

export default withRouter(FilterList);
