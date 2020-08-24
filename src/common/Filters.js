import { parse } from "query-string";
import { subMonths } from "date-fns";
/** Resets filter to default state. All options are unchecked */
const resetFilter = (filter) => {
  const { options = [] } = filter;
  options.map((option) => {
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
  Object.keys(queryStringFilters).forEach((key) => {
    const matchingFilter = filters.find(
      ({ targetApiField = "" }) =>
        targetApiField.toLowerCase() == key.toLowerCase()
    );

    if (matchingFilter) {
      const urlValues = queryStringFilters[key].toLowerCase().split(",");
      const { options = [] } = matchingFilter;

      options.map((option) => {
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
/**
 *
 * @param {date} date for data value
 */
const FormatDateString = (date) => {
  var formatDateValue =
    `${date.getMonth() + 1}` +
    `/` +
    `${date.getDate()}` +
    `/` +
    `${date.getFullYear()}`;

  return formatDateValue;
};

const ShowHideSmallSizeCheckBox = (checkboxName) => {
  var species = ["cat", "other"];
  var checkboxes = document.querySelectorAll(
      'input[name="' + checkboxName + '"]:checked'
    ),
    values = [];
  Array.prototype.forEach.call(checkboxes, function (el) {
    values.push(el.value.toUpperCase());
  });

  var arryLength = parseInt(values.length);
  if (arryLength != 0 && arryLength <= 2) {
    if (arryLength == 1) {
      document.getElementById(
        "weight-large"
      ).parentNode.style.display = values.includes("CAT") ? "none" : "block";
    } else {
      if (containsAll(species, values)) {
        document.getElementById("weight-large").parentNode.style.display =
          "none";
      } else {
        document.getElementById("weight-medium").parentNode.style.display =
          "block";
        document.getElementById("weight-large").parentNode.style.display =
          "block";
      }
    }
  } else {
    document.getElementById("weight-medium").parentNode.style.display = "block";
    document.getElementById("weight-large").parentNode.style.display = "block";
  }
};
const containsAll = (species, values) => {
  for (var i = 0; i < species.length; i++) {
    if (!values.includes(species[i].toUpperCase())) return false;
  }
  return true;
};

const InitilizeDateValues = () => {
  const current = new Date();
  const startDate = new Date(
    new Date().getFullYear() - 1,
    new Date().getMonth(),
    new Date().getDate()
  );

  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );

  const startDateFormat =
    `${startDate.getMonth() + 1}` +
    `/` +
    `${startDate.getDate()}` +
    `/` +
    `${startDate.getFullYear()}`;

  const endDateFormat =
    `${endDate.getMonth()}` +
    `/` +
    `${endDate.getDate()}` +
    `/` +
    `${endDate.getFullYear()}`;

  var fromToDateFormat = startDateFormat + "," + endDateFormat;

  return fromToDateFormat;
};

/**
 * Update filters based on a given querystring
 * @param {array} filters list of filters in the standard format for this app
 * @param {string} queryString querystring to be parsed
 */
const UpdateFilters = (filters = [], queryString = "") => {
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

const FilterSearchTags = (searchTags = [], textQuery = "", searchCategory) => {
  let newQuery = "";

  searchTags[searchCategory].map((item) => {
    const tagCategory = item.value.split(",");
    tagCategory.map((tag) => {
      if (tag.toLowerCase().trim() === textQuery.toLowerCase().trim()) {
        newQuery = item.label;
      }
    });
  });

  return newQuery ? newQuery : textQuery;
};

export {
  UpdateUrlQueryString,
  UpdateFilters,
  UpdateQueryString,
  FormatDateString,
  InitilizeDateValues,
  ShowHideSmallSizeCheckBox,
  FilterSearchTags,
};
