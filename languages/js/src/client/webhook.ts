import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { VerifyWebhookSignatureRequest } from "../bridge/proto/webhook";

export class WebhookClient {
  private bridge: BloockBridge;
  private configData: ConfigData | undefined;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * It verifies the signature of a webhook JSON
   * @param  {Uint8Array} payload: The webhook JSON in bytes
   * @param  {string} header: The signature header
   * @param  {string} secretKey: The secret Key
   * @param  {boolean} enforceTolerance: Weather to check for expiration of the signature
   * @returns {Promise<boolean>} A boolean indicating weather the signature is valid or not
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
