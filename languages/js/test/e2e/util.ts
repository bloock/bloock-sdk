import { Bloock } from "../../dist/index";

export function initSdk() {
  const apiKey = process.env["API_KEY"] || "";
  const apiHost = process.env["API_HOST"] || "";
  const identityApiHost = process.env["IDENTITY_API_HOST"] || "";

  Bloock.setApiKey(apiKey);
  if (apiHost) {
    Bloock.setApiHost(apiHost);
  }
  if (identityApiHost) {
    Bloock.setIdentityApiHost(identityApiHost);
  }
  
  Bloock.setDisableAnalytics(true);
}

export function initDevSdk() {
  const apiKey = process.env["DEV_API_KEY"] || "";
  const apiHost = process.env["DEV_API_HOST"] || "";
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
