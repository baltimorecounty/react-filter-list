import { FilterList } from "../src/index";
import React from "react";

const filters = [
  {
    targetApiField: "category.value",
    displayName: "Category",
    options: [
      { value: "releases", label: "News Releases" },
      { value: "stories", label: "Stories" }
    ]
  },
  {
    targetApiField: "orderby",
    displayName: "Sort",
    useRadioButton: true,
    options: [
      { label: "A-Z", value: "A" },
      { label: "Z-A", value: "D" }
    ]
  },
  {
    targetApiField: "recordsperpage",
    value: 10
  }
];
console.log(
  "***In order for text filtering to work you must go to hooks => useSearchTags.js and comment in all the green lines***"
);
const Demo = props => {
  return (
    <div className="demo">
      <FilterList
        title="Baltimore County Police Newsroom"
        filters={filters}
        apiEndpoint="https://localhost:44393/api/News/Police"
        includeInputFilter={true}
        includeDateFilter={true}
        includeClearButton={true}
        searchCategory="PoliceNews"
        inputFilterPlaceholder="Begin typing to filter by title or summary..."
        renderItem={({ title, articleSummary }) => (
          <div
            style={{
              border: "1px solid #e0e0e0",
              padding: "10px",
              marginBottom: "10px"
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
