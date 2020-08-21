import { FilterList } from "../src/index";
import React from "react";

// const searchTags = [
//   {
//     label: "fire",
//     value: "two-alarm, two alarm, alarm",
//   },
//   { label: "engine", value: "fire truck, truck, hook and ladder" },
//   {
//     label: "fireman",
//     value: "fire man, fire woman, fire person, fire fighter, fighter",
//   },
// ];

const searchTags = {
  fire: "two-alarm, two alarm, alarm",
  engine: "fire truck, truck, hook and ladder",
  fireman: "fire man, fire woman, fire person, fire fighter, fighter",
};

const filters = [
  {
    targetApiField: "category.value",
    displayName: "Category",
    options: [
      { value: "releases", label: "News Releases" },
      { value: "Stories", label: "Stories" },
    ],
  },
  //*******************************
  //Add these back in if you need to test the weight and pet type interactions
  // */
  // {
  //   targetApiField: "petType",
  //   displayName: "Species",
  //   options: [
  //     { value: "dog", label: "Dog" },
  //     { value: "cat", label: "Cat" },
  //     { value: "other", label: "Other" },
  //   ],
  // },
  // {
  //   targetApiField: "weight",
  //   displayName: "Size",
  //   options: [
  //     { value: "small", label: "Small" },
  //     { value: "medium", label: "Medium" },
  //     { value: "large", label: "Large" },
  //   ],
  // },

  {
    targetApiField: "recordsperpage",
    value: 10,
  },
];

const Demo = (props) => {
  return (
    <div className="demo">
      <FilterList
        title="News"
        filters={filters}
        apiEndpoint="https://localhost:44393/api/News"
        includeDateFilter={true}
        includeInputFilter={true}
        includeClearButton={true}
        searchTags={searchTags}
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
