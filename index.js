"use strict";

const crypto = require("crypto");
const uuid = require("uuid");

const buildHeader = (appId, appKey, method, url, body = null, testTimestamp = null, testNonce = null) => {
  if (!isAppIdValid(appId)) throw new Error("Invalid appId");

  const encodedURI = encodeURIComponent(url).toLowerCase();
  const processedBody = processBody(body);
  const timestamp = testTimestamp || Math.floor(new Date() / 1000);
  const nonce = testNonce || uuid.v1().replace(/-/g, "");
  const rawSignature = [appId, method, encodedURI, timestamp, nonce, processedBody].join("");

  const secret = Buffer.from(appKey, "base64");
  const signatureBase64 = crypto
    .createHmac("sha256", secret)
    .update(rawSignature, "utf8")
    .digest("base64");

  return "amx " + [appId, signatureBase64, nonce, timestamp].join(":");
};

const isAppIdValid = value =>
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
