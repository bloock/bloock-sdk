import { ConfigData } from "../bridge/proto/bloock_config";
import { NewConfigData } from "../config/config";
import { AuthenticityClient } from "./authenticity";
import { AvailabilityClient } from "./availability";
import { EncryptionClient } from "./encryption";
import { IdentityClient } from "./identity";
import { IdentityCoreClient } from "./identity_core";
import { IntegrityClient } from "./integrity";
import { KeyClient } from "./key";
import { RecordClient } from "./record";
import { WebhookClient } from "./webhook";

/**
 * Represents a client for interacting with the Bloock SDK.
 */
export class BloockClient {
  private configData: ConfigData;

  public AuthenticityClient: AuthenticityClient;
  public AvailabilityClient: AvailabilityClient;
  public EncryptionClient: EncryptionClient;
  public IdentityCoreClient: IdentityCoreClient;
  public IdentityClient: IdentityClient;
  public IntegrityClient: IntegrityClient;
  public KeyClient: KeyClient;
  public RecordClient: RecordClient;
  public WebhookClient: WebhookClient;

  /**
   * Creates a new instance of the Bloock SDK client with the specified configuration.
   * @param apiKey
   * @param identityApiHost
   */
  constructor(apiKey: string, identityApiHost?: string) {
    this.configData = NewConfigData(undefined);

    if (this.configData.config) {
      this.configData.config.apiKey = apiKey;
      this.configData.config.identityApiHost = identityApiHost;
    }

    this.AuthenticityClient = new AuthenticityClient(this.configData);
    this.AvailabilityClient = new AvailabilityClient(this.configData);
    this.EncryptionClient = new EncryptionClient(this.configData);
    this.IdentityCoreClient = new IdentityCoreClient(this.configData);
    this.IdentityClient = new IdentityClient(this.configData);
    this.IntegrityClient = new IntegrityClient(this.configData);
    this.KeyClient = new KeyClient(this.configData);
    this.RecordClient = new RecordClient(this.configData);
    this.WebhookClient = new WebhookClient(this.configData);
  }
}
