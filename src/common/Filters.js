import { parse } from "query-string";

/** Resets filter to default state. All options are unchecked */
const resetFilter = filter => {
  const { options = [] } = filter;
  options.map(option => {
    option.checked = false;
    return option;
  });
  return filter;
};

/** Reset any filters that do not exist in the query string. */
const resetEmptyFilters = (filters = [], queryStringFilters = {}) => {
  filters
    .filter(({ targetApiField = "" }) =>
      Object.keys(queryStringFilters).some(
        (key = "") => key.toLowerCase() !== targetApiField.toLowerCase()
      )
    )
    .forEach(resetFilter);
};

/**
 * Update filters based on a given querystring (parsed to an object)
 */
const updateFilters = (filters = [], queryStringFilters = {}) => {
  // Reset any filters that do not exist in the current querystring
  resetEmptyFilters(filters, queryStringFilters);

  // Update active filters based on querystring
  Object.keys(queryStringFilters).forEach(key => {
    const matchingFilter = filters.find(
      ({ targetApiField = "" }) =>
        targetApiField.toLowerCase() == key.toLowerCase()
    );

    if (matchingFilter) {
      const urlValues = queryStringFilters[key].toLowerCase().split(",");
      const { options = [] } = matchingFilter;

      options.map(option => {
        const { value = "" } = option;
        option.checked = urlValues.some(
          (urlValue = "") => value.toLowerCase() === urlValue.toLowerCase()
        );
        return option;
      });
    }
  });
};

/**
 * Update a given url querystring for a name value pair
 * @param {string} url full url with querystring
 * @param {string} name name of query string value you wish to update
 * @param {string} value value of query string name, an empty value will remove
 * that name/value pair from the string
 */
const UpdateUrlQueryString = (url, name, value) => {
  const [base, queryString] = url.split("?");
  const searchParams = new URLSearchParams(queryString || "");
  if (!!value) {
    searchParams.set(name, value);
  } else {
    searchParams.delete(name);
  }

  return [...searchParams].length > 0
    ? `${base}?${searchParams.toString()}`
    : base;
};

const FormatDateString = date => {
  return (formatDateValue =
    `${date.getMonth() + 1}` +
    `/` +
    `${date.getDate()}` +
    `/` +
    `${date.getFullYear()}`);
};

/**
 * Update filters based on a given querystring
 * @param {array} filters list of filters in the standard format for this app
 * @param {string} queryString querystring to be parsed
 */
const UpdateFilters = (filters = [], queryString) => {
  if (!queryString) {
    return filters.map(resetFilter);
  }

  const queryStringFilters = parse(queryString);

  updateFilters(filters, queryStringFilters);

  return [...filters];
};

/**
 * Updates an existing query string based on given filter information.
 * @param {Object} obj
 * @param {string} obj.filter - An object that contains information about the filter
 * @param {boolean} obj.filter.checked - If true, the filter is applied, otherwise it should be removed
 * @param {string} obj.filter.name - Name attribute of the filter
 * @param {string} obj.filter.value - Value attribute of the filter
 * @param {string} obj.filter.queryString - Querystring to update
 * @returns {string} Updated queryString based on whether the filter is applied or removed.
 * "?" is included in the querystring
 */
const UpdateQueryString = ({
  filter: { checked, name, value },
  queryString
}) => {
  const searchParams = new URLSearchParams(queryString || "");
  const existingValues = searchParams.has(name)
    ? searchParams.get(name).split(",")
    : [];

  if (checked) {
    if (existingValues.length > 0) {
      const doesValueExist =
        existingValues.findIndex(
          (existingValue = "") =>
            existingValue.toLowerCase() === value.toLowerCase()
        ) > -1;

      if (!doesValueExist) {
        existingValues.push(value);
        searchParams.set(name, existingValues);
      }
    } else {
      searchParams.set(name, value);
    }
  } else {
    if (existingValues.length > 1) {
      const newValues = existingValues.filter(
        (filterValue = "") => filterValue.toLowerCase() !== value.toLowerCase()
      );
      searchParams.set(name, newValues);
    } else {
      // we need to check to see if there are multiple values
      searchParams.delete(name);
    }
  }

  return [...searchParams].length > 0 ? `?${searchParams.toString()}` : "";
};

export {
  UpdateUrlQueryString,
  UpdateFilters,
  UpdateQueryString,
  FormatDateString
};
