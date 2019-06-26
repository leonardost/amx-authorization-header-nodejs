"use strict";

const crypto = require("crypto");
const uuid = require("uuid");

const buildHeader = (appId, appKey, method, url, body = null) => {
  checkIfParametersAreValid(appId, appKey, method, url, body);

  const encodedURI = encodeURIComponent(url).toLowerCase();
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = uuid.v1().replace(/-/g, "");
  const processedBody = processBody(body);
  const rawSignature = [appId, method.toUpperCase(), encodedURI, timestamp, nonce, processedBody].join("");

  const secret = Buffer.from(appKey, "base64");
  const signatureBase64 = crypto
    .createHmac("sha256", secret)
    .update(rawSignature, "utf8")
    .digest("base64");

  return "amx " + [appId, signatureBase64, nonce, timestamp].join(":");
};

const checkIfParametersAreValid = (appId, appKey, method, url, body) => {
  if (!isValidString(appId)) {
    throw new Error("Invalid appId to generate AMX authorization header");
  }
  const validMethods = [ 'GET', 'POST', 'PUT', 'DELETE', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE' ];
  if (!isValidString(method) || !validMethods.includes(method.toUpperCase())) {
    throw new Error("Invalid method to generate AMX authorization header");
  }
;}

const isValidString = value =>
  typeof value === "string" && value.length > 0;

const processBody = body => {
  if (body == null) return "";

  const md5ByteArray = Buffer.from(body);
  const md5HashByteArray = crypto
    .createHash("md5")
    .update(md5ByteArray)
    .digest();

  return Buffer.from(md5HashByteArray).toString("base64");
};

module.exports = {
  buildHeader
};
