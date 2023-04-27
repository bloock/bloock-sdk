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
