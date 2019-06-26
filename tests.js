"use strict";

const amx = require("./index");

const assert = (expected, actual) => {
  if (expected === actual) return true;
  throw new Error(`"${expected}" expected but got "${actual}" instead`);
};

const invalidParametersTest = () =>
  amx.buildHeader("", "", "", "", "");

try {
  invalidParametersTest();
} catch (e) {
  if (e.message !== "Invalid appId") {
    throw new Error(`Error expected but got no error`);
  }
}

console.log("All tests passed successfully");
