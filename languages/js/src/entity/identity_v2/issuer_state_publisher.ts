import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/config";
import { PublishIssuerStateRequest } from "../../bridge/proto/identity_v2";
import { Signer as SignerProto } from "../../bridge/proto/authenticity_entities";
import { Signer } from "../authenticity/signer";
import { IssuerStateReceipt } from "./issuer_state_receipt";

export class IssuerStatePublisher {
  issuerDid: string;
  signer?: SignerProto;
  configData: ConfigData;

  constructor(issuerDid: string, configData: ConfigData) {
    this.issuerDid = issuerDid;
    this.signer = undefined;
    this.configData = configData;
  }

  public withSigner(signer: Signer): IssuerStatePublisher {
    this.signer = signer.toProto();
    return this;
  }

  async build(): Promise<IssuerStateReceipt> {
    const bridge = new BloockBridge();

    const req = PublishIssuerStateRequest.fromPartial({
      configData: this.configData,
      issuerDid: this.issuerDid,
      signer: this.signer
    });

    return bridge
      .getIdentityV2()
      .PublishIssuerState(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return IssuerStateReceipt.fromProto(res.stateReceipt!);
      });
  }
}
