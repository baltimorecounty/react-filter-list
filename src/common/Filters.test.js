import {
  UpdateFilters,
  UpdateQueryString,
  UpdateUrlQueryString,
} from "./Filters";

const comma = "%2C";

describe("UpdateUrlQueryString", () => {
  test("should add query, if no querystring exists", () => {
    const actual = UpdateUrlQueryString("http://my/api", "query", "cars");

    expect(actual).toEqual("http://my/api?query=cars");
  });

  test("should update the query, if no querystring already exits", () => {
    const actual = UpdateUrlQueryString("http://my/api", "query", "vans");

    expect(actual).toEqual("http://my/api?query=vans");
  });

  test("should remove the query, if value is falsy", () => {
    const actual = UpdateUrlQueryString("http://my/api", "query", "");

    expect(actual).toEqual("http://my/api");
  });
});

describe("UpdateQueryString", () => {
  test("should add filter to querystring for a applied filter", () => {
    const actual = UpdateQueryString({
      filter: {
        name: "author",
        value: "John Doe",
        checked: true,
      },
      queryString: "?recordsPerPage=10&page=0",
    });
    expect(actual).toEqual("?recordsPerPage=10&page=0&author=John+Doe");
  });

  test("should append filter to querystring for a applied filter when that filter already has a value", () => {
    const actual = UpdateQueryString({
      filter: {
        name: "author",
        value: "John Doe",
        checked: true,
      },
      queryString: "?recordsPerPage=10&page=0&author=Jane+Doe",
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
        checked: true,
      },
      queryString: "?recordsPerPage=10&page=0&author=Jane+Doe",
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
        checked: false,
      },
      queryString: "?recordsPerPage=10&page=0&author=John+Doe",
    });
    expect(actual).toEqual(`?recordsPerPage=10&page=0`);
  });

  test("should remove filter value from querystring when that filter only contains another value", () => {
    const actual = UpdateQueryString({
      filter: {
        name: "author",
        value: "Jane Doe",
        checked: false,
      },
      queryString: `?recordsPerPage=10&page=0&author=John+Doe${comma}Jane+Doe`,
    });
    expect(actual).toEqual(`?recordsPerPage=10&page=0&author=John+Doe`);
  });

  test("should remove filter from querystring for an applied filter when a different filter exists", () => {
    const actual = UpdateQueryString({
      filter: {
        name: "title",
        value: "Important Title",
        checked: false,
      },
      queryString:
        "?recordsPerPage=10&page=0&author=Jane+Doe&title=Important+Title",
    });
    expect(actual).toEqual(`?recordsPerPage=10&page=0&author=Jane+Doe`);
  });

  test("should not add duplicate values if the value already exists", () => {
    const actual = UpdateQueryString({
      filter: {
        name: "title",
        value: "Important Title",
        checked: true,
      },
      queryString: "?recordsPerPage=10&page=0&title=Important+Title",
    });
    expect(actual).toEqual(`?recordsPerPage=10&page=0&title=Important+Title`);
  });

  test("should return an empty queryString when no filters are applied", () => {
    const actual = UpdateQueryString({
      filter: {
        name: "title",
        value: "Important Title",
        checked: false,
      },
      queryString: "?title=Important+Title",
    });
    expect(actual).toEqual(``);
  });
});

describe("UpdateFilters", () => {
  test("should update filter from query string (single value)", () => {
    const actual = UpdateFilters(
      [
        {
          targetApiField: "category",
          options: [
            {
              value: "fun",
            },
          ],
        },
      ],
      {
        filter: { or: [{ category: "fun" }] },
      }
    );

    expect(actual).toEqual([
      {
        targetApiField: "category",
        options: [
          {
            value: "fun",
            checked: true,
          },
        ],
      },
    ]);
  });

  test("should update filter from query string (single value)", () => {
    const actual = UpdateFilters(
      [
        {
          targetApiField: "category",
          options: [
            {
              value: "fun",
            },
            {
              value: "not-fun",
            },
          ],
        },
      ],
      {
        filter: {
          or: [{ category: "fun" }, { category: "not-fun" }],
        },
      }
    );

    expect(actual).toEqual([
      {
        targetApiField: "category",
        options: [
          {
            value: "fun",
            checked: true,
          },
          {
            value: "not-fun",
            checked: true,
          },
        ],
      },
    ]);
  });

  test.skip("should clear querystring if querystring is empty", () => {
    const actual = UpdateFilters(
      [
        {
          targetApiField: "category",
          options: [
            {
              value: "fun",
              checked: true,
            },
            {
              value: "not-fun",
              checked: true,
            },
          ],
        },
      ],
      {}
    );

    expect(actual).toEqual([
      {
        targetApiField: "category",
        options: [
          {
            value: "fun",
            checked: false,
          },

          {
            value: "not-fun",
            checked: false,
          },
        ],
      },
    ]);
  });

  test.skip("should handle value with spaces", () => {
    const actual = UpdateFilters(
      [
        {
          targetApiField: "category.value",
          options: [
            {
              value: "releases",
              checked: true,
            },
            {
              value: "stories",
              checked: false,
            },
          ],
        },
        {
          targetApiField: "author",
          options: [
            {
              value: "jane",
              checked: false,
            },
            {
              value: "jane doe",
              checked: true,
            },
          ],
        },
      ],
      "?category.value=releases%2Cstories"
    );

    expect(actual).toEqual([
      {
        targetApiField: "category.value",
        options: [
          {
            value: "releases",
            checked: true,
          },
          {
            value: "stories",
            checked: true,
          },
        ],
      },
      {
        targetApiField: "author",
        options: [
          {
            value: "jane",
            checked: false,
          },
          {
            value: "jane doe",
            checked: false,
          },
        ],
      },
    ]);
  });
});
