import { UpdateQueryString } from "./Filters";

const comma = "%2C";

test("should add filter to querystring for a applied filter", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "author",
      value: "John Doe",
      checked: true
    },
    queryString: "?recordsPerPage=10&page=0"
  });
  expect(actual).toEqual("?recordsPerPage=10&page=0&author=John+Doe");
});

test("should append filter to querystring for a applied filter when that filter already has a value", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "author",
      value: "John Doe",
      checked: true
    },
    queryString: "?recordsPerPage=10&page=0&author=Jane+Doe"
  });
  expect(actual).toEqual(
    `?recordsPerPage=10&page=0&author=Jane+Doe${comma}John+Doe`
  );
});

test("should add filter to querystring for another applied filter when a different filter exists", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "title",
      value: "Important Title",
      checked: true
    },
    queryString: "?recordsPerPage=10&page=0&author=Jane+Doe"
  });
  expect(actual).toEqual(
    `?recordsPerPage=10&page=0&author=Jane+Doe&title=Important+Title`
  );
});

test("should remove filter from querystring when that filter only has that value", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "author",
      value: "John Doe",
      checked: false
    },
    queryString: "?recordsPerPage=10&page=0&author=John+Doe"
  });
  expect(actual).toEqual(`?recordsPerPage=10&page=0`);
});

test("should remove filter value from querystring when that filter only contains another value", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "author",
      value: "Jane Doe",
      checked: false
    },
    queryString: `?recordsPerPage=10&page=0&author=John+Doe${comma}Jane+Doe`
  });
  expect(actual).toEqual(`?recordsPerPage=10&page=0&author=John+Doe`);
});

test("should remove filter from querystring for an applied filter when a different filter exists", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "title",
      value: "Important Title",
      checked: false
    },
    queryString:
      "?recordsPerPage=10&page=0&author=Jane+Doe&title=Important+Title"
  });
  expect(actual).toEqual(`?recordsPerPage=10&page=0&author=Jane+Doe`);
});

test("should not add duplicate values if the value already exists", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "title",
      value: "Important Title",
      checked: true
    },
    queryString: "?recordsPerPage=10&page=0&title=Important+Title"
  });
  expect(actual).toEqual(`?recordsPerPage=10&page=0&title=Important+Title`);
});

test("should return an empty queryString when no filters are applied", () => {
  const actual = UpdateQueryString({
    filter: {
      name: "title",
      value: "Important Title",
      checked: false
    },
    queryString: "?title=Important+Title"
  });
  expect(actual).toEqual(``);
});
