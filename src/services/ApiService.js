import { Config } from "@baltimorecounty/javascript-utilities";
import axios from "axios";

const { getValue } = Config;

const GetSearchTags = () =>
  axios
    .get(`${getValue("apiRoot")}`)
    .then(({ status, data }) => (status === 200 ? data : []));

export { GetSearchTags };
