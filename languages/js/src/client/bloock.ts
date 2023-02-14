import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { AuthenticityClient } from "./authenticity";
import { EncryptionClient } from "./encryption";
import { IntegrityClient } from "./integrity";
import { RecordClient } from "./record";
import { WebhookClient } from "./webhook";

export class BloockClient {
  private configData: ConfigData;

  public IntegrityClient: IntegrityClient;
  public AuthenticityClient: AuthenticityClient;
  public EncryptionClient: EncryptionClient;
  public RecordClient: RecordClient;
  public WebhookClient: WebhookClient;

  constructor(apiKey: string) {
    this.configData = NewConfigData(undefined);

    if (this.configData.config) {
      this.configData.config.apiKey = apiKey;
    }

    this.IntegrityClient = new IntegrityClient(this.configData);
    this.EncryptionClient = new EncryptionClient(this.configData);
    this.RecordClient = new RecordClient(this.configData);
    this.AuthenticityClient = new AuthenticityClient(this.configData);
    this.WebhookClient = new WebhookClient(this.configData);
  }
}
