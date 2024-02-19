import { createHmac } from "crypto";
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
  const apiKey = "no9rLf9dOMjXGvXQX3I96a39qYFoZknGd6YHtY3x1VPelr6M-TmTLpAF-fm1k9Zp"
  const apiHost = "https://api.bloock.dev"
  const identityApiHost = "https://identity-managed-api.bloock.dev"

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
  timestamp = Date.now()
): string {
  const message = Buffer.from(
    `0000000000000000${Math.floor(Math.round(timestamp / 1000) / 30).toString(
      16
    )}`.slice(-16),
    "hex"
  )
  const key = Buffer.from(base32ToHex(secretKey.toUpperCase()), "hex")
  const hmac = createHmac("sha1", key)
  hmac.setEncoding("hex")
  hmac.update(message)
  hmac.end()
  const data = hmac.read()
  return (
    parseInt(data.substr(parseInt(data.slice(-1), 16) * 2, 8), 16) & 2147483647
  )
    .toString()
    .slice(-6)
}

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

const base32ToHex = (base32: string) => {
  let bits = ""
  let hex = ""
  for (let index = 0; index < base32.length; index++) {
    const value = charset.indexOf(base32.charAt(index))
    bits += `00000${value.toString(2)}`.slice(-5)
  }
  for (let index = 0; index < bits.length - 3; index += 4) {
    const chunk = bits.substring(index, index + 4)
    hex = hex + parseInt(chunk, 2).toString(16)
  }
  return hex
}
