import { Update, UpdateCheckboxFilters, UpdateTextFilter } from "./ODataFilter";

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
});

describe("UpdateTextFilter", () => {
  test("has value", () => {
    const actual = UpdateTextFilter(["firstName", "lastName"], "Ron", {});
    expect(actual).toEqual({
      and: [
        {
          or: { firstName: { contains: "Ron" }, lastName: { contains: "Ron" } },
        },
      ],
    });
  });

  test("has value", () => {
    const actual = UpdateTextFilter(["firstName", "lastName"], "", {});
    expect(actual).toEqual({});
  });
});
