import { formatCurrency } from "../scripts/utils/money.js";

describe("testSuite for format Currency: ", () => {
  it("Converts cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("check with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Rounds up to nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
