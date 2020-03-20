import { IsMatch } from "./Comparison";

test("should match string", () => {
  const actual = IsMatch("t", "t");
  expect(actual).toEqual(true);
});
