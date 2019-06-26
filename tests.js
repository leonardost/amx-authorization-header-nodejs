"use strict";

const uuid = require("uuid");

// Mocks
Date.now = () => 1000;
uuid.v1 = () => 'A';

const amx = require("./index");

const assert = (expected, actual) => {
  if (expected === actual) return true;
  throw new Error(`"${expected}" expected but got "${actual}" instead`);
};

const assertInvalidAppIdTest = () => {
  let error = null;
  try {
    amx.buildHeader("", "", "", "", "");
  } catch (e) {
    error = e;
  }
  if (error == null || error.message !== "Invalid appId to generate AMX authorization header") {
    throw new Error(`Error expected but got no error`);
  }
};

const assertInvalidMethodTest = () => {
  let error = null;
  try {
    amx.buildHeader("appId", "", "INVALID METHOD", "", "");
  } catch (e) {
    error = e;
  }
  if (error == null || error.message !== "Invalid method to generate AMX authorization header") {
    throw new Error(`Error expected but got no error`);
  }
};

assertInvalidAppIdTest();
assertInvalidMethodTest();
assert(
  'amx appId:X/74v8vbODKIFcufEAr8iWVUlmyEOfppCWtm3D9kEFg=:A:1',
  amx.buildHeader('appId', 'appKey', 'GET', 'https://test.com', null)
);
assert(
  'amx appId:v6F0NbQSaZOXcWy0Lh/iIan8wPWdxnrqGeMZXX2UCS8=:A:1',
  amx.buildHeader('appId', 'appKey', 'POST', 'https://test.com', JSON.stringify({ 'parameter': 'value' }))
);
assert(
  'amx appId:v6F0NbQSaZOXcWy0Lh/iIan8wPWdxnrqGeMZXX2UCS8=:A:1',
  amx.buildHeader('appId', 'appKey', 'post', 'https://test.com', JSON.stringify({ 'parameter': 'value' }))
);

console.log("All tests passed successfully");
