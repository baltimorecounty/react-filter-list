// __tests__/fetch.test.js
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ApiList from "./ApiList";
import { FetchList as mockFetchList } from "../common/Fetch";

jest.mock("../common/Fetch");

const MockNewsCard = ({ title, author }) => (
  <div>
    <h1>{title}</h1>
    <p>{author}</p>
  </div>
);

test("loads and displays a list", async () => {
  mockFetchList.mockResolvedValueOnce({
    metaData: { totalRecords: 2 },
    records: [
      { title: "News Story 1", author: "Jane Doe" },
      { title: "News Story 2", author: "John Doe" },
    ],
  });

  render(
    <ApiList
      title="My List"
      renderItem={(props) => (
        <MockNewsCard key={props.title + props.author} {...props} />
      )}
    />
  );

  expect(screen.getByText(/loading my list.../i)).toBeInTheDocument();

  expect(mockFetchList).toBeCalledTimes(1);

  await waitFor(() => {
    expect(screen.getByText(/2 result/i)).toBeInTheDocument();
    expect(screen.getByText(/news story 1/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByText(/news story 2/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();

    //TODO: Make sure load more button is not visible
  });
});
