import buildQuery from "odata-query";
import { parse } from "query-string";

const countFilter = { count: true };

const getKeyIndex = (arr, name, value) =>
  arr.findIndex((orFilter) =>
    Object.keys(orFilter).some((key = "") => {
      const keyWithoutUpper = key.replace("tolower(", "").replace(")", "");
      return (
        keyWithoutUpper.toLowerCase() === name.toLowerCase() &&
        value.toLowerCase() === orFilter[key].toLowerCase()
      );
    })
  );

/**
 * Convert a odata query to a odata filter object
 * @param {string} odataQuery
 */
const ToOdataFilter = (odataQuery = "", orderBy = []) => {
  if (!odataQuery) {
    return { ...countFilter, ...(orderBy.length > 0 && { orderBy: orderBy }) };
  }

  const { $filter } = parse(odataQuery);
  const filterParts = decodeURIComponent($filter).split(" and ");
  const or =
    filterParts.find((x) => x.toLowerCase().indexOf(" eq ") > -1) || "";
  const and =
    filterParts.find((x) => x.toLowerCase().indexOf("contains(") > -1) || "";
  const orParts = or.length > 0 ? or.split(" or ") : [];
  const andParts = and.length > 0 ? and.split(" or ") : [];
  const orConditions = orParts.reduce((orFilters, currentValue) => {
    const [name, value] = getQueryCondition(currentValue);
    orFilters.push({
      [name]: value.toLowerCase(),
    });
    return orFilters;
  }, []);
  const andConditions = andParts.reduce((andOrConditions, currentValue) => {
    const [name, value] = getFunctionCondition(currentValue);
    andOrConditions[name] = { contains: value.toLowerCase() };
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
    ...(orderBy.length > 0 && { orderBy: orderBy }),
  };
};

const getQueryCondition = (query, operator = " eq ") => {
  const [name, value] = query.split(operator);
  return [
    `${removeQueryCharacters(name).replace("tolower", "tolower(")})`,
    removeQueryCharacters(value),
  ];
};

const getFunctionCondition = (query, comparisonFn = "contains") =>
  removeQueryCharacters(query.replace(`${comparisonFn}(`, "")).split(",");

const removeQueryCharacters = (str = "") =>
  str.replace(/\(|\)/g, "").replace(/\"|\'/g, "");

/**
 * Update
 * @param {*} param0
 */
const Update = ({ checkboxFilter, textFilter, odataQuery = {}, orderBy }) => {
  console.log("test", orderBy);
  const { filter = {} } = odataQuery;
  const updatedFilter = {
    ...(checkboxFilter && UpdateCheckboxFilters(checkboxFilter, filter)),
    ...(textFilter && UpdateTextFilter(textFilter)),
  };
  const updatedOdataQuery = {
    ...(Object.keys(updatedFilter).length > 0 && { filter: updatedFilter }),
    ...countFilter,
    ...(orderBy.length > 0 && { orderBy: orderBy }),
  };
  const queryString = buildQuery(updatedOdataQuery);

  return {
    ...updatedOdataQuery,
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
  odataQuery = {}
) => {
  const { or = [] } = { ...odataQuery };
  const existingFilterIndex = getKeyIndex(or, name, value);
  const shouldRemoveFilter = existingFilterIndex > -1 && !checked;
  const isAlreadyApplied = existingFilterIndex > -1 && checked;

  if (shouldRemoveFilter) {
    or.splice(existingFilterIndex, 1);
  }
  // avoid duplicated filters
  else if (!isAlreadyApplied) {
    or.push({ [`tolower(${name})`]: value.toLowerCase() });
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
        filters[`tolower(${name})`] = { contains: value.toLowerCase() };
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
