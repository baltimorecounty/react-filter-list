import React, { useEffect, useState } from "react";
import {
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString
} from "../common/Filters";

import ApiList from "./ApiList.jsx";
import DefaultFilter from "./DefaultFilter.jsx";
import DefaultLoadMoreButton from "./DefaultLoadMoreButton";
import FilterTextInput from "./FilterTextInput";
import Filters from "./Filters.jsx";
import PropTypes from "prop-types";
import RecordsMessage from "./RecordsMessage";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

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
  inputFilterPlaceholder = "Begin typing to filter...",
  filters: filtersFromProps = [],
  apiEndpoint: defaultApiEndpoint,
  history,
  staticContext,
  ...props
}) => {
  // console.log("props:" + JSON.stringify(filtersFromProps));
  let filterDateValue = filtersFromProps.filter(
    name => name.targetApiField == "FilterDate"
  );
  let toFromDatePart = filterDateValue[0].value.split(",");
  //  console.log("toFromDatePart----:" + JSON.stringify(toFromDatePart[0]));
  // console.log("filterDate----:" + JSON.stringify(filterDateValue[0].value.split(",")));
  const [fromDate, setFromDate] = useState(
    filterDateValue ? new Date(toFromDatePart[0]) : new Date("01/01/2019")
  );
  const [toDate, setToDate] = useState(
    filterDateValue ? new Date(toFromDatePart[1]) : new Date("07/11/2020")
  );
  const fromDateId = `fromDate`;
  const toDateId = `toDate`;
  // const [filterDate, setFilterDate] = useState(
  //   "?FilterDate=06/01/2020,12/01/2020"
  // );
  console.log("fromDate:" + fromDate);
  //const [staticFilterQueryString, setStaticFilterQueryString] = useState();

  let staticFilterQueryString = null;
  staticFilterQueryString = filtersFromProps
    .filter(({ value }) => value)
    .map(({ targetApiField, value }) => `${targetApiField}=${value}`)
    .join("&");
  const [filters, setFilters] = useState(() =>
    UpdateFilters(filtersFromProps, location.search)
  );
  console.log("*****************************************");
  console.log(staticFilterQueryString);
  console.log(filters);
  console.log("*****************************************");

  const [apiEndpoint, setApiEndpoint] = useState(
    () =>
      (defaultApiEndpoint = staticFilterQueryString
        ? defaultApiEndpoint + "?" + staticFilterQueryString
        : defaultApiEndpoint)
  );
  //console.log(apiEndpoint);
  useEffect(() => {
    setFilters(filters => UpdateFilters(filters, location.search));
    setApiEndpoint(
      defaultApiEndpoint +
        location.search +
        (location.search.indexOf("?") > -1 ? "&" : "?") +
        staticFilterQueryString
    );
  }, [location.search]);

  const updateQueryString = filter => {
    const [base, currentQueryString] = apiEndpoint.split("?");
    const queryString = UpdateQueryString({
      filter,
      queryString: currentQueryString.replace(staticFilterQueryString, "")
    });
    // console.log("--before history.push---");
    // console.log("currentQueryString:" + currentQueryString);
    // console.log("staticFilterQueryString:" + staticFilterQueryString);
    // console.log("currentQueryString.replace:" + currentQueryString.replace(staticFilterQueryString, ""));
    // console.log("queryString:" + queryString);
    // console.log("--location.pathname:--" + location.pathname);
    // console.log("---end history.push---");
    history.push(location.pathname + queryString);
  };

  const handleFilterChange = changeEvent => {
    // console.log("inside -handleFilterChange");
    const { name, value, checked } = changeEvent;
    // console.log("name:value:checked::" + name + "--" + value + "---" + checked);
    updateQueryString({ name, value, checked });
  };

  const handleFilterTextInputChange = query => {
    const updatedUrl = UpdateUrlQueryString(apiEndpoint, "filter", query);

    // This disables any browser history updates
    // Since a user could possibly update a ton of entries
    setApiEndpoint(updatedUrl);
  };

  const handleFromDateChange = date => {
    console.log("--in handleFromDateChange--");
    // setFromDate(date);
    //staticFilterQueryString="FilterDate={fromDate},{toDate}"
    // handleChange({
    //   fromDate: date,
    //   toDate
    // });
    //const updatedUrl = testUpdateUrlQueryString(apiEndpoint, "FilterDate",staticFilterQueryString);

    // This disables any browser history updates
    // Since a user could possibly update a ton of entries
    //setApiEndpoint(updatedUrl);
  };

  const handleToDateChange = date => {
    console.log("-+++++-handleToDateChange-++++++-");
/*     setToDate(date);
    staticFilterQueryString = "FilterDate={fromDate},{toDate}"; */
    // handleChange({
    //   fromDate,
    //   toDate: date
    // });
  };

  console.log("==================");

  //  let test1 = apiEndpoint.indexOf("?") > -1 || apiEndpoint.indexOf("&") > -1? apiEndpoint.substring(0, apiEndpoint.length-1):apiEndpoint;
  //console.log(test1);
  /// setApiEndpoint({test1});
  // console.log(apiEndpoint);

  return (
    <div {...props}>
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <DatePicker
            name={fromDateId}
            id={fromDateId}
            selected={fromDate}
            onChange={handleFromDateChange}
          //  onSelect={handleSelect}
            value={fromDate}
            //startDate={months[0] || new Date()}
            //dateFormat="MM/yyyy"
            // showMonthYearPicker
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <DatePicker
            name={toDateId}
            id={toDateId}
            selected={toDate}
            onChange={handleToDateChange}
            value={fromDate}
            //startDate={months[0] || new Date()}
            //dateFormat="MM/yyyy"
            // showMonthYearPicker
          />
        </div>
      </div>
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
