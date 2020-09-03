import { FilterList } from "../src/index";
import React from "react";

const filters = [
  // {
  //   targetApiField: "category.value",
  //   displayName: "Category",
  //   options: [
  //     { value: "releases", label: "News Releases" },
  //     { value: "Stories", label: "Stories" },
  //   ],
  // },
  //*******************************
  //Add these back in if you need to test the weight and pet type interactions
  // */
  {
    targetApiField: "status",
    value: "Adoptable",
  },

  {
    targetApiField: "recordsPerPage",
    value: 10,
  },
  {
    targetApiField: "petType",
    displayName: "Species",
    options: [
      { value: "dog", label: "Dog" },
      { value: "cat", label: "Cat" },
      { value: "other", label: "Other" },
    ],
  },
  {
    targetApiField: "weight",
    displayName: "Size",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
  },
];

const Demo = (props) => {
  return (
    <div className="demo">
      <FilterList
        title="News"
        filters={filters}
        apiEndpoint="https://localhost:44387/api/Pets"
        //includeDateFilter={true}
        includeInputFilter={true}
        includeClearButton={true}
        searchCategory="Pets"
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
