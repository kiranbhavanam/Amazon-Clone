import { formatCurrency } from "../scripts/utils/money.js";

describe("testSuite for format Currency: ", () => {
  it("Converts cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
});
