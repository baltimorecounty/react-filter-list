const getKeyIndex = (arr, name) =>
  arr.findIndex((orFilter) =>
    Object.keys(orFilter).some(
      (key = "") => key.toLowerCase() === name.toLowerCase()
    )
  );

/**
 * Updates an existing query string based on given filter information.
 * @param {Object} obj
 * @param {string} obj.filter - An object that contains information about the filter
 * @param {boolean} obj.filter.checked - If true, the filter is applied, otherwise it should be removed
 * @param {string} obj.filter.name - Name attribute of the filter
 * @param {string} obj.filter.value - Value attribute of the filter
 * @param {object} existingFilters - Filter to update
 * @param {string} type - Determines whether condition will be applied ot the filter. And and or are available.
 * @returns {string} Updated queryString based on whether the filter is applied or removed.
 * "?" is included in the querystring
 */
const Update = (
  { name = "", value, checked },
  existingFilters = {},
  type = "or"
) => {
  const updatedFilters = { ...existingFilters };
  const { or = [], and = {} } = updatedFilters;

  const existingFilterIndex = getKeyIndex(or, name);
  const shouldRemoveFilter = existingFilterIndex > -1 && !checked;
  const isAlreadyApplied = existingFilterIndex > -1 && checked;

  if (shouldRemoveFilter) {
    or.splice(existingFilterIndex, 1);
  }
  // avoid duplicated filters
  else if (!isAlreadyApplied) {
    or.push({ [name]: value });
  }

  return {
    ...(or.length > 0 && { or }),
  };
};

export { Update };
