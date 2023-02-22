import { Bloock } from "../dist/index";

export function initSdk() {
  const apiKey = process.env["API_KEY"] || "";
  const apiHost = process.env["API_HOST"] || "";
  Bloock.setApiKey(apiKey);
  if (apiHost) {
    Bloock.setApiHost(apiHost);
  }
  Bloock.setDisableAnalytics(true);
}

enum SignatureAlg {
  ES256K
}

enum EncryptionAlg {
  RSA_OAEP_256,
  A256GCM
}

function test() {
  const keysClient = new KeysClient();

  const name = "Key display name";

  const key: Key = keysClient.newManagedKey(name, {
    type: KeyType.EC_P256K,
    protection: ProtectionLevel.HSM,
    expiration: 12341823
  });
}
