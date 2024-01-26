import * as crypto from "crypto";
import { Bloock } from "../../dist/index";

export function initSdk() {
  const apiKey = process.env["API_KEY"] || "";
  const apiHost = process.env["API_HOST"] || "";

  Bloock.setApiKey(apiKey);
  if (apiHost) {
    Bloock.setApiHost(apiHost);
  }

  Bloock.setDisableAnalytics(true);
}

export function initDevSdk() {
  const apiKey =
    "dINDc7QKk4-rPUNamI-ZxM0M9IM8qlQMlpRj5L6kn-k59t83vzeVDS2iSn3L9Zet";
  const apiHost = "https://api.bloock.dev";
  const identityApiHost = process.env["DEV_IDENTITY_API_HOST"] || "";

  Bloock.setApiKey(apiKey);
  if (apiHost) {
    Bloock.setApiHost(apiHost);
  }
  if (identityApiHost) {
    Bloock.setIdentityApiHost(identityApiHost);
  }

  Bloock.setDisableAnalytics(true);
}

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export function generateTOTPClient(
  secretKey: string,
  timestamp: number
): string {
  const base32Decoder = (base32: string) =>
    base32Encode(Buffer.from(base32), false);
  secretKey = secretKey.toUpperCase().trim();
  const secretBytes = base32Decoder(secretKey);

  const timeBytes = Buffer.alloc(8);
  timeBytes.writeUIntBE(Math.floor(timestamp / 30), 0, 8);

  const hash = crypto.createHmac("sha1", secretBytes);
  hash.update(timeBytes);

  const h = hash.digest();

  const offset = h[h.length - 1] & 0x0f;

  const truncatedHash = h.readUInt32BE(offset) & 0x7fffffff;

  return (truncatedHash % 1_000_000).toString().padStart(6, "0");
}

function base32Encode(data: Buffer, padding: boolean): string {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < view.byteLength; i++) {
    value = (value << 8) | view.getUint8(i);
    bits += 8;

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += "=";
    }
  }

  return output;
}
