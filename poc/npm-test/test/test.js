// test/test.js
const math = require("../math"); // Path might vary based on your project structure
const expect = require("chai").expect;

describe("Math", function () {
  describe("add", function () {
    it("should add two numbers", function () {
      const result = math.add(2, 3);
      expect(result).to.equal(5);
    });

    it("should handle negative numbers", function () {
      const result = math.add(-2, 3);
      expect(result).to.equal(1);
    });

    it("should handle zero", function () {
      const result = math.add(0, 5);
      expect(result).to.equal(5);
    });
  });
});
