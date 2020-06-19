const getKeyIndex = (arr, name) =>
  arr.findIndex((orFilter) =>
    Object.keys(orFilter).some(
      (key = "") => key.toLowerCase() === name.toLowerCase()
    )
  );

const Update = ({ name = "", value, checked }, existingFilters = {}) => {};

/**
 * Updates an existing query string based on given filter information.
 * @param {Object} obj
 * @param {string} obj.filter - An object that contains information about the filter
 * @param {boolean} obj.filter.checked - If true, the filter is applied, otherwise it should be removed
 * @param {string} obj.filter.name - Name attribute of the filter
 * @param {string} obj.filter.value - Value attribute of the filter
 * @param {object} existingFilters - Filters to update
 * @returns {string} Updated queryString based on whether the filter is applied or removed.
 * "?" is included in the querystring
 */
const UpdateCheckboxFilters = (
  { name = "", value, checked },
  existingFilters = {}
) => {
  const { or = [] } = { ...existingFilters };
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

/**
 * Gets Odata object based on a given query
 * @param {array} filterFieldNames - the fields names you use in the text filter
 * @param {string} value - query value to filter the fields by
 */
const UpdateTextFilter = (filterFieldNames = [], value) => {
  const andOrConditions = value
    ? filterFieldNames.reduce((filters, name) => {
        filters[name] = { contains: value };
        return filters;
      }, {})
    : {};
  return {
    ...(Object.keys(andOrConditions).length > 0 && {
      and: [
        {
          or: andOrConditions,
        },
      ],
    }),
  };
};

export { Update, UpdateCheckboxFilters, UpdateTextFilter };
