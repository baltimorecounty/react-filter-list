import React, { useEffect, useState } from "react";
import { subMonths } from "date-fns";
import {
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString,
  FormatDateString,
  InitilizeDateValues,
  ShowHideSmallSizeCheckBox
} from "../common/Filters";

import ApiList from "./ApiList.jsx";
import DefaultFilter from "./DefaultFilter.jsx";
import DefaultLoadMoreButton from "./DefaultLoadMoreButton";
import FilterTextInput from "./FilterTextInput";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
import RecordsMessage from "./RecordsMessage";
import { withRouter } from "react-router-dom";
import FilterDateSelector from "../components/FilterDateSelector";
import { Button, Collapse } from "@baltimorecounty/dotgov-components";

const FilterList = ({
  title = "",
  listContainerClassName = "list",
  renderItem = () => <p>You must specify a renderItem function.</p>,
  renderFilter = (filter, onChange) => (
    <DefaultFilter filter={filter} onChange={onChange} />
  ),
  renderListHeader = count => (
    <div className="list-header">
      <RecordsMessage count={count} />
    </div>
  ),
  renderLoadMoreButton = props => <DefaultLoadMoreButton {...props} />,
  includeInputFilter = false,
  includeDateFilter = false,
  includeClearButton = false,
  inputFilterPlaceholder = "Begin typing to filter...",
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  history,
  staticContext,
  ...props
}) => {
  let filterDateValue = InitilizeDateValues();

  let [startDatePart, endDatePart] = !!filterDateValue
    ? filterDateValue.split(",")
    : null;

  const [fromDate, setFromDate] = useState(
    !!startDatePart ? new Date(startDatePart) : null
  );
  const [isClear, setIsClear] = useState(false);

  const [toDate, setToDate] = useState(
    !!endDatePart ? new Date(endDatePart) : null
  );

  const staticFilterQueryString = filtersFromProps
    .filter(({ value }) => value)
    .map(({ targetApiField, value }) => `${targetApiField}=${value}`)
    .join("&");
  const [filters, setFilters] = useState(() =>
    UpdateFilters(filtersFromProps, location.search)
  );

  const buildDefaultEndPoint = () => {
    const dateFilter = "filterdate=" + filterDateValue;
    const staticFilter = "?" + staticFilterQueryString;
    let newEndPoint;

    if (staticFilterQueryString && includeDateFilter) {
      newEndPoint = defaultApiEndpoint + staticFilter + "&" + dateFilter;
    } else if (staticFilterQueryString && !includeDateFilter) {
      newEndPoint = defaultApiEndpoint + staticFilter;
    } else if (!staticFilterQueryString && includeDateFilter) {
      newEndPoint = defaultApiEndpoint + "?" + dateFilter;
    } else {
      newEndPoint = defaultApiEndpoint;
    }

    return newEndPoint;
  };

  const [apiEndpoint, setApiEndpoint] = useState(
    () => (defaultApiEndpoint = buildDefaultEndPoint())
  );

  useEffect(() => {
    setFilters(filters => UpdateFilters(filters, location.search));

    if (location.search.indexOf("?") > -1) {
      setApiEndpoint(defaultApiEndpoint + location.search);
    } else {
      setApiEndpoint(includeDateFilter ? apiEndpoint : defaultApiEndpoint);
    }
  }, [location.search]);

  const updateQueryString = filter => {
    const [base, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter,
      queryString: currentQueryString === undefined ? "" : currentQueryString
    });
    setApiEndpoint(queryString);
    history.push(location.pathname + queryString);
  };

  const handleFilterChange = changeEvent => {
    const { name, value, checked } = changeEvent;
    if (name == "petType") {
      ShowHideSmallSizeCheckBox(name);
    }

    updateQueryString({ name, value, checked });
  };

  const handleFilterTextInputChange = query => {
    const updatedUrl = UpdateUrlQueryString(apiEndpoint, "filter", query);

    // This disables any browser history updates
    // Since a user could possibly update a ton of entries
    setApiEndpoint(updatedUrl);
  };

  const handleFromDateChange = date => {
    setFromDate(date);

    var fromToDateFormattedValue = date
      ? FormatDateString(date) + "," + FormatDateString(toDate)
      : null;

    const updatedUrl = UpdateUrlQueryString(
      apiEndpoint,
      "filterdate",
      fromToDateFormattedValue
    );

    // // This disables any browser history updates
    // // Since a user could possibly update a ton of entries
    // //TODO: if you uncomment this line , it will change the url ???
    const [base, queryString] = updatedUrl.split("?");
    history.push(location.pathname + "?" + queryString);
    setApiEndpoint(updatedUrl);
  };

  const handleToDateChange = date => {
    setToDate(date);

    var fromToDateFormattedValue = date
      ? FormatDateString(fromDate) + "," + FormatDateString(date)
      : null;

    const updatedUrl = UpdateUrlQueryString(
      apiEndpoint,
      "filterdate",
      fromToDateFormattedValue
    );

    // This disables any browser history updates
    // Since a user could possibly update a ton of entries
    //TODO: if you uncomment this line , it will change the url ???
    const [base, queryString] = updatedUrl.split("?");
    history.push(location.pathname + "?" + queryString);
    setApiEndpoint(updatedUrl);
  };
  const clearFilter = () => {
    setIsClear(true);
    const [base, currentQueryString] = apiEndpoint.split("?");
    setApiEndpoint(base);
    history.push(location.pathname);
  };

  const buttonStyles = {
    paddingLeft: "100",
    paddingRight: "0"
  };

  return (
    <div {...props}>
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <div>
            <Filters
              renderFilter={renderFilter}
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>
          {includeDateFilter ? (
            <Collapse id="date-collapse" header="Date">
              <FilterDateSelector
                name="startDate"
                id="startDate"
                selected={!isClear ? fromDate : null}
                onChange={handleFromDateChange}
                maxDate={toDate}
                autocomplete="off"
                label="Start Date"
              />
              <FilterDateSelector
                name="endDate"
                id="endDate"
                selected={!isClear ? toDate : null}
                onChange={handleToDateChange}
                minDate={fromDate}
                maxDate={new Date()}
                autocomplete="off"
                label="End Date"
              />
            </Collapse>
          ) : null}
          {includeClearButton ? (
            <div className="dg_card__footer">
              <Button
                className="dg_button-link"
                onClick={clearFilter}
                text="Clear filters"
                style={buttonStyles}
              />
            </div>
          ) : null}
        </div>
        <div></div>
        <div className="col-md-9 col-xs-12">
          {includeInputFilter && (
            <FilterTextInput
              onChange={handleFilterTextInputChange}
              placeholder={inputFilterPlaceholder}
              isClear={isClear}
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
  listContainerClassName: PropTypes.string
};

export default withRouter(FilterList);
