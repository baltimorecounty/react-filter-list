// __tests__/fetch.test.js
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ApiList from "./ApiList";

test("loads and displays a list", async () => {
  render(<ApiList title="My List" />);

  expect(screen.getByText(/loading my list.../i)).toBeInTheDocument();

  //   axiosMock.get.mockResolvedValueOnce({
  //     data: { greeting: "hello there" },
  //   });
  //   fireEvent.click(screen.getByText("Load Greeting"));
  //   await waitFor(() => screen.getByRole("heading"));
  //   expect(axiosMock.get).toHaveBeenCalledTimes(1);
  //   expect(axiosMock.get).toHaveBeenCalledWith(url);
  //   expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  //   expect(screen.getByRole("button")).toHaveAttribute("disabled");
});
