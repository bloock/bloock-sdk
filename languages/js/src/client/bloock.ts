import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { AuthenticityClient } from "./authenticity";
import { AvailabilityClient } from "./availability";
import { EncryptionClient } from "./encryption";
import { IdentityLegacyClient } from "./identity";
import { IdentityClient } from "./identity_v2";
import { IntegrityClient } from "./integrity";
import { KeyClient } from "./key";
import { RecordClient } from "./record";
import { WebhookClient } from "./webhook";

export class BloockClient {
  private configData: ConfigData;

  public AuthenticityClient: AuthenticityClient;
  public AvailabilityClient: AvailabilityClient;
  public EncryptionClient: EncryptionClient;
  public IdentityLegacyClient: IdentityLegacyClient;
  public IdentityClient: IdentityClient;
  public IntegrityClient: IntegrityClient;
  public KeyClient: KeyClient;
  public RecordClient: RecordClient;
  public WebhookClient: WebhookClient;

  constructor(apiKey: string, identityApiHost?: string, forceEnv?: string) {
    this.configData = NewConfigData(undefined);

    if (this.configData.config) {
      this.configData.config.apiKey = apiKey;
      this.configData.config.environment = forceEnv;
      this.configData.config.identityApiHost = identityApiHost;
    }

    this.AuthenticityClient = new AuthenticityClient(this.configData);
    this.AvailabilityClient = new AvailabilityClient(this.configData);
    this.EncryptionClient = new EncryptionClient(this.configData);
    this.IdentityLegacyClient = new IdentityLegacyClient(this.configData);
    this.IdentityClient = new IdentityClient(this.configData);
    this.IntegrityClient = new IntegrityClient(this.configData);
    this.KeyClient = new KeyClient(this.configData);
    this.RecordClient = new RecordClient(this.configData);
    this.WebhookClient = new WebhookClient(this.configData);
  }
}
