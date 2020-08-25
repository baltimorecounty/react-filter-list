import { useEffect, useState } from "react";
import { GetSearchTags } from "../services/ApiService";
import { Config } from "@baltimorecounty/javascript-utilities";
import tagData from "../data/SearchTags";

const { setConfig, getValue } = Config;

//const localApiRoot = "local"; //if testing locally in this project use this
const localApiRoot = "//beta.baltimorecountymd.gov/sebin/y/l/SearchTags.json";
const testApiRoot = "//beta.baltimorecountymd.gov/sebin/y/l/SearchTags.json";
const prodApiRoot = "//baltimorecountymd.gov/sebin/y/l/SearchTags.json";

const configValues = {
  local: {
    apiRoot: localApiRoot,
  },
  development: {
    apiRoot: testApiRoot,
  },
  staging: {
    apiRoot: testApiRoot,
  },
  production: {
    apiRoot: prodApiRoot,
  },
};

setConfig(configValues);

const useSearchTags = () => {
  const [hasError, setHasError] = useState(false);
  const [searchTags, setSearchTags] = useState([]);

  useEffect(() => {
    getValue("apiRoot") === "local"
      ? setSearchTags(tagData)
      : GetSearchTags()
          .then((response) => {
            setSearchTags(response);
          })
          .catch(() => {
            setHasError(true);
          });
  }, []);

  return [
    {
      searchTags,
      hasError,
    },
  ];
};

export default useSearchTags;
