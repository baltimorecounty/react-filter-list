import { FilterList } from "../src/index";
import React from "react";
import {
  InitilizeDateValues
} from "../src/common/Filters";

var fromToDateFormat =InitilizeDateValues();
const filters = [
  {
    targetApiField: "category.value",
    displayName: "Category",
    options: [
      { value: "releases", label: "News Releases" },
      { value: "stories", label: "Stories" },
    ],
  },
 
  // {
  //  targetApiField: "Filter",
  //    value:"Million"
  //  },
 
   {
    targetApiField: "FilterDate",
    displayName: "FilterDate",
     value: `${fromToDateFormat}`
   }
];

const Demo = (props) => {
  return (
    <div className="demo">
      <FilterList
        title="News"
        filters={filters}
        apiEndpoint="https://localhost:44393/api/News"
        
        renderItem={({ title, articleSummary }) => (
          <div
            style={{
              border: "1px solid #e0e0e0",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2>{title}</h2>
            <p>{articleSummary}</p>
          </div>
        )}
      />
    </div>
  );
};

export default Demo;
