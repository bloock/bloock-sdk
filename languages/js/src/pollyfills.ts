import fetch, { Headers, Request, Response } from "node-fetch";

// @ts-ignore: Declare fetch for browser & node
if (!globalThis.fetch) {
  // @ts-ignore: Declare fetch for browser & node
  globalThis.fetch = fetch;
  // @ts-ignore: Declare fetch Headers for browser & node
  globalThis.Headers = Headers;
  // @ts-ignore: Declare fetch Request for browser & node
  globalThis.Request = Request;
  // @ts-ignore: Declare fetch Response for browser & node
  globalThis.Response = Response;
}

if (typeof TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}

if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}
