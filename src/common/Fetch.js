import "promise-polyfill/src/polyfill";
import "whatwg-fetch";

/**
 * Fetch a url that is polyfilled.
 * @param {string} url
 */
const Fetch = (url) => fetch(url).then((res) => res.json());

export default Fetch;
