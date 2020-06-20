import {
  ToOdataFilter,
  Update,
  UpdateCheckboxFilters,
  UpdateTextFilter,
} from "./ODataFilter";

describe("Update", () => {
  test("single checkbox filter add, no existing filters", () => {
    const actual = Update({
      checkboxFilter: {
        name: "firstName",
        value: "Leslie",
        checked: true,
      },
      existingFilters: {},
    });

    expect(actual.filters).toEqual({
      or: [{ firstName: "Leslie" }],
    });
  });

  test("single checkbox filter with text filter, no existing filters", () => {
    const actual = Update({
      checkboxFilter: {
        name: "firstName",
        value: "Leslie",
        checked: true,
      },
      textFilter: {
        fieldNames: ["firstName", "lastName"],
        value: "les",
      },
      existingFilters: {},
    });

    expect(actual.filters).toEqual({
      or: [{ firstName: "Leslie" }],
      and: [
        {
          or: { firstName: { contains: "les" }, lastName: { contains: "les" } },
        },
      ],
    });
  });
});

describe("UpdateCheckboxFilters", () => {
  test("single filter added", () => {
    const actual = UpdateCheckboxFilters(
      { name: "firstName", value: "Ron", checked: true },
      {}
    );

    expect(actual).toEqual({
      or: [{ firstName: "Ron" }],
    });
  });

  test("single filter added but already exists, does not create duplicate", () => {
    const fakeFilter = {
      or: [{ firstName: "Ron" }],
    };
    const actual = UpdateCheckboxFilters(
      { name: "firstName", value: "Ron", checked: true },
      fakeFilter
    );

    expect(actual).toEqual(fakeFilter);
  });

  test("single filter removed", () => {
    const fakeFilter = { name: "firstName", value: "Ron", checked: false };
    const fakeExistingFilter = {
      or: [{ firstName: "Ron" }],
    };

    const actual = UpdateCheckboxFilters(fakeFilter, fakeExistingFilter);

    expect(actual).toEqual({});
  });

  test("multiple filter exist, addFilter", () => {
    const fakeFilter = {
      or: [{ firstName: "Ron" }],
    };
    const actual = UpdateCheckboxFilters(
      { name: "lastName", value: "Swanson", checked: true },
      fakeFilter
    );

    expect(actual).toEqual({
      or: [{ firstName: "Ron" }, { lastName: "Swanson" }],
    });
  });

  test("multiple filter exist, added but already exists, does not create duplicate", () => {
    const fakeFilter = {
      or: [{ firstName: "Ron" }, { lastName: "Swanson" }],
    };
    const actual = UpdateCheckboxFilters(
      { name: "lastName", value: "Swanson", checked: true },
      fakeFilter
    );

    expect(actual).toEqual(fakeFilter);
  });

  test("add multiple conditions for the same field", () => {
    const fakeFilter = {
      or: [{ firstName: "Ron" }],
    };
    const actual = UpdateCheckboxFilters(
      { name: "firstName", value: "Leslie", checked: true },
      fakeFilter
    );

    expect(actual).toEqual({
      or: [{ firstName: "Ron" }, { firstName: "Leslie" }],
    });
  });

  test("remove condition when there are multiple conditions applied for the same field", () => {
    const fakeFilter = {
      or: [{ firstName: "Ron" }, { firstName: "Leslie" }],
    };
    const actual = UpdateCheckboxFilters(
      { name: "firstName", value: "Leslie", checked: false },
      fakeFilter
    );

    expect(actual).toEqual({
      or: [{ firstName: "Ron" }],
    });
  });
});

describe("UpdateTextFilter", () => {
  test("has value", () => {
    const actual = UpdateTextFilter(
      { fieldNames: ["firstName", "lastName"], value: "Ron" },
      {}
    );
    expect(actual).toEqual({
      and: [
        {
          or: { firstName: { contains: "Ron" }, lastName: { contains: "Ron" } },
        },
      ],
    });
  });

  test("has value", () => {
    const actual = UpdateTextFilter(
      { fieldNames: ["firstName", "lastName"], value: "" },
      {}
    );
    expect(actual).toEqual({});
  });
});

describe("ToOdataFilter", () => {
  test("empty return object", () => {
    const actual = ToOdataFilter("");
    expect(actual).toEqual({});
  });

  test("single checkboxFilter", () => {
    const actual = ToOdataFilter("?$filter=((city eq 'Perry Hall'))");
    expect(actual).toEqual({
      or: [{ city: "Perry Hall" }],
    });
  });

  test("multiple checkboxFilter", () => {
    const actual = ToOdataFilter(
      "?$filter=((city eq 'Essex') or (city eq 'Perry Hall'))"
    );
    expect(actual).toEqual({
      or: [{ city: "Essex" }, { city: "Perry Hall" }],
    });
  });
});
