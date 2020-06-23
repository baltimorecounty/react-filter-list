import buildQuery from "odata-query";
import { parse } from "query-string";

const countFilter = { count: true };

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
    return countFilter;
  }

  const { $filter, $count } = parse(odataQuery);
  const filterParts = decodeURIComponent($filter).split(" and ");
  const or =
    filterParts.find((x) => x.toLowerCase().indexOf(" eq ") > -1) || "";
  const and =
    filterParts.find((x) => x.toLowerCase().indexOf("contains(") > -1) || "";
  const orParts = or.length > 0 ? or.split(" or ") : [];
  const andParts = and.length > 0 ? and.split(" or ") : [];
  const orConditions = orParts.reduce((orFilters, currentValue) => {
    const [property, value] = getQueryCondition(currentValue);
    orFilters.push({ [property.toLowerCase()]: value });
    return orFilters;
  }, []);
  const andConditions = andParts.reduce((andOrConditions, currentValue) => {
    const [property, value] = getFunctionCondition(currentValue);
    andOrConditions[property] = { contains: value };
    return andOrConditions;
  }, {});

  const filter = {
    ...(orConditions.length > 0 && { or: orConditions }),
    ...(Object.keys(andConditions).length > 0 && {
      and: [{ or: andConditions }],
    }),
  };

  return {
    ...(Object.keys(filter).length > 0 && { filter }),
    ...countFilter,
  };
};

const getQueryCondition = (query, operator = " eq ") =>
  removeQueryCharacters(query).split(operator);

const getFunctionCondition = (query, comparisonFn = "contains") =>
  removeQueryCharacters(query.replace(`${comparisonFn}(`, "")).split(",");

const removeQueryCharacters = (str = "") =>
  str.replace(/\(|\)/g, "").replace(/\"|\'/g, "");

/**
 * Update
 * @param {*} param0
 */
const Update = ({ checkboxFilter, textFilter, existingFilters = {} }) => {
  const filter = {
    ...(checkboxFilter &&
      UpdateCheckboxFilters(checkboxFilter, existingFilters.filters)),
    ...(textFilter && UpdateTextFilter(textFilter)),
  };

  const queryString = buildQuery({
    ...(Object.keys(filter).length > 0 && { filter }),
    ...countFilter,
  });

  return {
    filters: filter,
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
