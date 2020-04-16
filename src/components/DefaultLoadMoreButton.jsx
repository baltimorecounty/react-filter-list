import { Button } from "@baltimorecounty/dotgov-components";
import React from "react";

const DefaultLoadMoreButton = ({ isFetching, onClick, isFetchingMore }) => (
  <Button
    type="button"
    disabled={isFetching}
    text={isFetchingMore ? "Loading more..." : "Load More"}
    onClick={onClick}
  />
);

export default DefaultLoadMoreButton;
