"use strict";

const crypto = require("crypto");
const uuid = require("uuid");

const buildAmxHeader = (appId, appKey, method, url, body = null) => {
  const encodedURI = encodeURIComponent(url).toLowerCase();
  const processedBody = processBody(body);
  const timestamp = Math.floor(new Date() / 1000);
  const nonce = uuid.v1().replace(/-/g, "");
  const payload = [appId, method, encodedURI, timestamp, nonce, processedBody].join("");

  const secret = Buffer.from(appKey, "base64");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("base64");

  return "amx " + [appId, signature, nonce, timestamp].join(":");
};

const processBody = body => {
  if (body == null) return "";

  const md5ByteArray = Buffer.from(body);
  const md5HashByteArray = crypto
    .createHash("md5")
    .update(md5ByteArray)
    .digest();

  return Buffer.from(md5HashByteArray).toString("base64");
};

module.exports = buildAmxHeader;
