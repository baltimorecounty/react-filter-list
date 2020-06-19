import { Update } from "./ODataFilter";

test("single filter added", () => {
  const actual = Update({ name: "firstName", value: "Ron", checked: true }, {});

  expect(actual).toEqual({
    or: [{ firstName: "Ron" }],
  });
});

test("single filter added but already exists, does not create duplicate", () => {
  const fakeFilter = {
    or: [{ firstName: "Ron" }],
  };
  const actual = Update(
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

  const actual = Update(fakeFilter, fakeExistingFilter);

  expect(actual).toEqual({});
});

test("multiple filter exist, addFilter", () => {
  const fakeFilter = {
    or: [{ firstName: "Ron" }],
  };
  const actual = Update(
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
  const actual = Update(
    { name: "lastName", value: "Swanson", checked: true },
    fakeFilter
  );

  expect(actual).toEqual(fakeFilter);
});

test("multiple filter exist, removed", () => {
  const fakeFilter = {
    or: [{ firstName: "Ron" }, { lastName: "Swanson" }],
  };
  const actual = Update(
    { name: "lastName", value: "Swanson", checked: false },
    fakeFilter
  );

  expect(actual).toEqual({
    or: [{ firstName: "Ron" }],
  });
});
