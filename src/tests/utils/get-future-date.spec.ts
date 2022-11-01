import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test("Increase date with one year", () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(year + 1);
});
