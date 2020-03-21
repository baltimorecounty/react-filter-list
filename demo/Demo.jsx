import FilterList from "../src/components/FilterList";
import React from "react";

const filters = [
  {
    targetApiField: "category.value",
    displayName: "Category",
    options: [
      { value: "releases", label: "News Releases" },
      { value: "stories", label: "Stories" }
    ]
  }
];

const Demo = props => {
  return (
    <div className="demo">
      <p>Demo Stuff Goes here</p>
      <FilterList
        title="Baltimore County News"
        filters={filters}
        apiEndpoint="https://structuredcontentdev.bcg.ad.bcgov.us/api/news"
        renderItem={({ title }) => <div>{title}</div>}
      />
    </div>
  );
};

export default Demo;
