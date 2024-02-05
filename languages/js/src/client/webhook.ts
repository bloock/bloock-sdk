import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { VerifyWebhookSignatureRequest } from "../bridge/proto/webhook";

/**
 * Provides functionality for interacting with [Bloock Webhook service](https://dashboard.bloock.com/login).
 */
export class WebhookClient {
  private bridge: BloockBridge;
  private configData: ConfigData | undefined;

  /**
   * Creates a new WebhookClient with default configuration.
   * @param configData 
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Verifies the signature of a webhook payload using the provided parameters.
   * @param payload 
   * @param header 
   * @param secretKey 
   * @param enforceTolerance 
   * @returns 
   */
  public async verifyWebhookSignature(
    payload: Uint8Array,
    header: string,
    secretKey: string,
    enforceTolerance: boolean
  ): Promise<boolean> {
    const request = VerifyWebhookSignatureRequest.fromPartial({
      configData: this.configData,
      payload: payload,
      header: header,
      secretKey: secretKey,
      enforceTolerance: enforceTolerance
    });

    return this.bridge
      .getWebhook()
      .VerifyWebhookSignature(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.isValid;
      });
  }
}
