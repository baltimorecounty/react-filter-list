import { parse } from "query-string";

/**
 * Update filters based on a given querystring
 * @param {array} filters list of filters in the standard format for this app
 * @param {string} queryString querystring to be parsed
 */
const UpdateFilters = (filters = [], queryString = "") => {
  const queryStringFilters = parse(queryString);

  Object.keys(queryStringFilters).forEach((key) => {
    const matchingFilter = filters.find(
      ({ targetApiField = "" }) =>
        targetApiField.toLowerCase() == key.toLowerCase()
    );

    if (matchingFilter) {
      const urlValues = queryStringFilters[key].toLowerCase().split(",");

      matchingFilter.options
        .filter(({ value = "" }) =>
          urlValues.some(
            (urlValue = "") => value.toLowerCase() === urlValue.toLowerCase()
          )
        )
        .map((x) => {
          x.checked = true;
        });
    }
  });

  return filters;
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
  queryString,
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

export { UpdateFilters, UpdateQueryString };
