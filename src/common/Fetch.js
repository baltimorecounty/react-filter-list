/**
 * Fetches list of items
 * Note: load more endpoint will be null unless load more is triggered.
 * That is why we are checking that first. If load more endpoint is null, it is a change from props.
 * @param {string} key
 * @param {object} optionalParams
 * @param {string} optionalParams.endpoint endpoint passed to the list from props
 * @param {string} loadMoreEndpoint endpoint passed from api list when the load more button is selected
 */
const FetchList = (key, { endpoint }, loadMoreEndpoint) =>
  fetch(loadMoreEndpoint || endpoint).then((res) => res.json());

export { FetchList };
