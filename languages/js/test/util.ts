import { Bloock, BloockClient } from "../dist/index";

export function getSdk() {
  const apiKey = process.env["API_KEY"] || "";
  const apiHost = process.env["API_HOST"] || "";
  Bloock.setApiKey(apiKey);
  const client = new BloockClient();
  if (apiHost) {
    Bloock.setApiHost(apiHost);
  }
  Bloock.setDisableAnalytics(true);
  return client;
}
