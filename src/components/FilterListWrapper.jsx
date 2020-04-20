import FilterList from "./FilterList";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const FilterListWrapper = (props) => (
  <Router>
    <FilterList {...props} />
  </Router>
);

export default FilterListWrapper;
