/**
 * Updates an existing query string based on given filter information.
 * @param {Object} obj
 * @param {string} obj.filter - An object that contains information about the filter
 * @param {boolean} obj.filter.checked - If true, the filter is applied, otherwise it should be removed
 * @param {string} obj.filter.name - Name attribute of the filter
 * @param {string} obj.filter.value - Value attribute of the filter
 * @param {object} existingFilters - Filter to update
 * @returns {string} Updated queryString based on whether the filter is applied or removed.
 * "?" is included in the querystring
 */
const Update = ({ name = "", value, checked }, existingFilters = {}) => {
  const updatedFilters = { ...existingFilters };
  const { or = [] } = updatedFilters;

  const existingFilterIndex = or.findIndex((orFilter) =>
    Object.keys(orFilter).some(
      (key = "") => key.toLowerCase() === name.toLowerCase()
    )
  );
  const shouldRemoveFilter = existingFilterIndex > -1 && !checked;
  const isAlreadyApplied = existingFilterIndex > -1 && checked;

  if (shouldRemoveFilter) {
    or.slice(existingFilterIndex, 1);
  }
  // avoid duplicated filters
  else if (!isAlreadyApplied) {
    or.push({ [name]: value });
  }

  return {
    or,
  };
};

export { Update };
