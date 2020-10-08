import React, { useEffect, useState } from "react";
import {
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString,
  FormatDateString,
  InitilizeDateValues,
  ShowHideSmallSizeCheckBox,
  FilterSearchTags,
} from "../common/Filters";
import useSearchTags from "../hooks/useSearchTags";
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
  /*************************/
  /******* Parameters ******/
  /*************************/

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
  includeDateFilter = false,
  includeClearButton = false,
  inputFilterPlaceholder = "Begin typing to filter...",
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  history,
  searchCategory = "",
  staticContext,
  ...props
}) => {
  /*************************/
  /***** Initialization ****/
  /*************************/

  let filterDateValue = InitilizeDateValues();

  const [{ searchTags = [], hasError }] = useSearchTags();

  let [startDatePart, endDatePart] = !!filterDateValue
    ? filterDateValue.split(",")
    : null;

  const [fromDate, setFromDate] = useState(
    !!startDatePart ? new Date(startDatePart) : null
  );
  const [isClear, setIsClear] = useState(false);
  const [isDateClear, setIsDateClear] = useState(false);

  const [toDate, setToDate] = useState(
    !!endDatePart ? new Date(endDatePart) : null
  );

  /********************************/
  /* URL/Querystring Manipulation */
  /********************************/

  const staticFilterQueryString = filtersFromProps
    .filter(({ value }) => value)
    .map(({ targetApiField, value }) => `${targetApiField}=${value}`)
    .join("&");

  const buildDefaultEndPoint = () => {
    const dateFilter = "filterdate=" + filterDateValue;
    const staticFilter = "?" + staticFilterQueryString;
    const endPointRoot = defaultApiEndpoint.split("?")[0];
    let newEndPoint;
    if (location.search.indexOf("?") > -1) {
      newEndPoint = endPointRoot + location.search;
    } else if (staticFilterQueryString && includeDateFilter) {
      newEndPoint = endPointRoot + staticFilter + "&" + dateFilter;
    } else if (staticFilterQueryString && !includeDateFilter) {
      newEndPoint = endPointRoot + staticFilter;
    } else if (!staticFilterQueryString && includeDateFilter) {
      newEndPoint = endPointRoot + "?" + dateFilter;
    } else {
      newEndPoint = endPointRoot;
    }
    return newEndPoint;
  };

  // Updates the URL with the filter changes
  const updateUrlWithFilter = (filterName, filterValue) => {
    const updatedUrl = UpdateUrlQueryString(
      apiEndpoint,
      filterName,
      filterValue
    );
    const [base, queryString] = updatedUrl.split("?");
    history.push(location.pathname + "?" + queryString);
    setApiEndpoint(updatedUrl);
  };

  // Updates the URL with the checkbox filter changes
  const updateUrlWithCheckboxFilter = (filter) => {
    const [base, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter,
      queryString: currentQueryString === undefined ? "" : currentQueryString,
    });
    history.push(location.pathname + queryString);
  };

  /*************************/
  /******* Add Hooks *******/
  /*************************/

  const [apiEndpoint, setApiEndpoint] = useState(
    () => (defaultApiEndpoint = buildDefaultEndPoint())
  );

  // This is a hook triggered when the querystring in the URL is changed.
  useEffect(() => {
    setFilters((filters) => UpdateFilters(filters, location.search));
    setApiEndpoint(buildDefaultEndPoint());
  }, [location.search]);

  const [filters, setFilters] = useState(() =>
    UpdateFilters(filtersFromProps, location.search)
  );

  /*************************/
  /* Handle Filter Changes */
  /*************************/

  // Pet Type Checkbox Change
  const handleFilterChange = (changeEvent) => {
    const { name } = changeEvent;
    if (name == "petType") {
      ShowHideSmallSizeCheckBox(name);
    }
    updateUrlWithCheckboxFilter(changeEvent);
  };

  // Text Filter Change
  const handleFilterTextInputChange = (query) => {
    if (isClear) {
      setIsClear(false);
    }

    if (query.trim()) {
      query =
        !searchCategory || hasError
          ? query
          : FilterSearchTags(searchTags, query, searchCategory);
      updateUrlWithFilter("filter", query);
    } else {
      updateUrlWithFilter("filter", null);
    }
  };

  // From Date Change
  const handleFromDateChange = (date) => {
    setFromDate(date);
    handleDateChange(date, toDate);
  };

  // To Date Change
  const handleToDateChange = (date) => {
    setToDate(date);
    handleDateChange(fromDate, date);
  };

  handleDateChange = (pFromDate, pToDate) => {
    if (isDateClear) {
      setIsDateClear(false);
    }

    var fromToDateFormattedValue =
      pFromDate && pToDate
        ? FormatDateString(pFromDate) + "," + FormatDateString(pToDate)
        : null;

    updateUrlWithFilter("filterdate", fromToDateFormattedValue);
  };

  // Clear Filter Change
  const clearFilter = () => {
    setIsClear(true);
    setIsDateClear(true);
    const [base, currentQueryString] = apiEndpoint.split("?");
    var sliceValue = base.slice(base.lastIndexOf("/") + 1, base.length);
    var defaultUrl = "?status=Adoptable&recordsPerPage=10";

    setApiEndpoint(
      sliceValue.toLowerCase() === "pets" ? base + defaultUrl : base
    );
    history.push(
      sliceValue.toLowerCase() === "pets"
        ? location.pathname + defaultUrl
        : location.pathname
    );
  };

  /*************************/
  /******* Component *******/
  /*************************/

  const buttonStyles = {
    paddingLeft: "100",
    paddingRight: "0",
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
                selected={!isDateClear ? fromDate : null}
                onChange={handleFromDateChange}
                maxDate={toDate}
                autocomplete="off"
                label="Start Date"
              />

              <FilterDateSelector
                name="endDate"
                id="endDate"
                selected={!isDateClear ? toDate : null}
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

/*************************/
/******* Properties ******/
/*************************/

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
