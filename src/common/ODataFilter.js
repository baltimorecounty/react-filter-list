import buildQuery from "odata-query";

const getKeyIndex = (arr, name, value) =>
  arr.findIndex((orFilter) =>
    Object.keys(orFilter).some(
      (key = "") =>
        key.toLowerCase() === name.toLowerCase() &&
        value.toLowerCase() === orFilter[key].toLowerCase()
    )
  );

/**
 * Convert a odata query to a odata filter object
 * @param {string} odataQuery
 */
const ToOdataFilter = (odataQuery = "") => {
  if (!odataQuery) {
    return {};
  }

  var odataParts = odataQuery.replace("?", "").split("&");
  var filters = odataParts
    .find((x) => x.indexOf("$filter=") > -1)
    .replace("$filter=", "");
  var [or, and] = filters.split(" and ");
  var orParts = or.split(" or ");

  const orConditions = orParts.reduce((orFilters, currentValue) => {
    const [property, value] = getQueryCondition(currentValue);
    orFilters.push({ [property.toLowerCase()]: value });
    return orFilters;
  }, []);

  return {
    or: orConditions,
  };
};

const getQueryCondition = (query, operator = " eq ") =>
  query.replace(/\(|\)/g, "").replace(/\"|\'/g, "").split(operator);

/**
 * Update
 * @param {*} param0
 */
const Update = ({ checkboxFilter, textFilter, existingFilters }) => {
  const filters = {
    ...(checkboxFilter &&
      UpdateCheckboxFilters(checkboxFilter, existingFilters.filters)),
    ...(textFilter && UpdateTextFilter(textFilter)),
  };
  const queryString = buildQuery({ filter: filters });

  return {
    filters,
    queryString,
  };
};

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
  const existingFilterIndex = getKeyIndex(or, name, value);
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
 * @param {array} fieldNames - the fields names you use in the text filter
 * @param {string} value - query value to filter the fields by
 */
const UpdateTextFilter = ({ fieldNames = [], value }) => {
  const andOrConditions = value
    ? fieldNames.reduce((filters, name) => {
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

export { ToOdataFilter, Update, UpdateCheckboxFilters, UpdateTextFilter };
