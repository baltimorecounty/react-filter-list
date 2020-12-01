import { FilterList } from "../src/index";
import React from "react";

const filters = [
    {
      targetApiField: "category.value",
      displayName: "Category",
      options: [
        { value: "releases", label: "News Releases" },
        { value: "stories", label: "Stories" },
      ],
    },
    {
      targetApiField: "recordsperpage",
      value: 10,
    },
  ];

const Demo = props => {
  return (
    <div className="demo">
        <FilterList
        title="Baltimore County Police Newsroom"
        filters={filters}
        apiEndpoint="http://localhost:44393/api​/News​/Police"
        renderItem={(props) => <PoliceNewsRoomCard {...props} />}
        includeInputFilter={true}
        includeDateFilter={true}
        includeClearButton={true}
        searchCategory="PoliceNews"
        inputFilterPlaceholder="Begin typing to filter by title or summary..."
        />
    </div>
  );
};

export default Demo;
