import ApiList from "../src/components/ApiList";
import { Button } from "@baltimorecounty/dotgov-components";
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
];

const Demo = (props) => {
  return (
    <div className="demo">
      <ApiList
        endpoint="http://localhost:54727/api/hub/structuredContent/news?recordsPerPage=5"
        title="Sample News"
        renderLoadMoreButton={({ isFetching, onClick, isFetchingMore }) => (
          <Button
            type="button"
            disabled={isFetching}
            text={isFetchingMore ? "Loading more..." : "Load More"}
            onClick={onClick}
          />
        )}
        renderItem={({ title, articleSummary }, index) => (
          <div
            style={{
              border: "1px solid #e0e0e0",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2>
              {index} - {title}
            </h2>
            <p>{articleSummary}</p>
          </div>
        )}
      />
    </div>
  );
};

export default Demo;
