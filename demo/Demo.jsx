import { FilterList } from "../src/index";
import React from "react";

const filters =[
    {
        targetApiField: "status",
        value:
          window.pets.petStatus ||
          console.error("You must provide a pets.petStatus."),
      },
      {
        targetApiField: "workingcat",
        value:
          window.pets.workingCats,
      },
      {
        targetApiField: "recordsPerPage",
        value: 10,
      },
      {
        targetApiField: "gender",
        displayName: "Gender",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "unknown", label: "Unknown" },
        ],
      },
];

const Demo = props => {
  return (
    <div className="demo">
      <FilterList
        title="Pets"
        filters={filters}
        apiEndpoint="https://localhost:44387/api/Pets?status=Adoptable"
        includeDateFilter={false}
        includeInputFilter={true}
        includeClearButton={true}
        searchCategory="Pets"
        renderItem={({ animalName, aboutMe }) => (
          <div
            style={{
              border: "1px solid #e0e0e0",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h2>{animalName}</h2>
            <p>{aboutMe}</p>
          </div>
        )}
      />
    </div>
  );
};

export default Demo;
