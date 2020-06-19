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
