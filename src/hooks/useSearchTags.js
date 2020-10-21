import { useEffect, useState } from "react";
import { GetSearchTags } from "../services/ApiService";
import tagData from "../data/SearchTags";
import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig, getValue } = Config;

const localApiRoot = "local"; //Uncomment all the commented out fields to tst locally with the local json keyword file.
const testApiRoot = "//beta.baltimorecountymd.gov/sebin/y/l/SearchTags.json";
const prodApiRoot = "//www.baltimorecountymd.gov/sebin/y/m/SearchTags.json";

const configValues = {
  local: {
    apiRoot: localApiRoot
  },
  development: {
    apiRoot: testApiRoot
  },
  staging: {
    apiRoot: testApiRoot
  },
  production: {
    apiRoot: prodApiRoot
  }
};

setConfig(configValues);

const useSearchTags = () => {
  const [hasError, setHasError] = useState(false);
  const [searchTags, setSearchTags] = useState([]);
  useEffect(() => {
    if (getValue("apiRoot") === "local") {
      setSearchTags(tagData);
    } else {
      GetSearchTags()
        .then(response => {
          setSearchTags(response);
        })
        .catch(() => {
          setHasError(true);
        });
    }
  }, []);

  return [
    {
      searchTags,
      hasError
    }
  ];
};

export default useSearchTags;
