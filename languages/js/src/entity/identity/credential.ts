import { BloockBridge } from "../../bridge/bridge";
import {
  CredentialFromJsonRequest,
  CredentialToJsonRequest
} from "../../bridge/proto/identity";
import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { NewConfigData } from "../../config/config";
import { CredentialBody } from "./credential_body";

export class Credential {
  threadId: string;
  body: CredentialBody;

  constructor(threadId: string, body: CredentialBody) {
    this.threadId = threadId;
    this.body = body;
  }

  public toProto(): identityEntitiesProto.Credential {
    return identityEntitiesProto.Credential.fromPartial({
      threadId: this.threadId,
      body: this.body.toProto()
    });
  }

  static fromProto(r: identityEntitiesProto.Credential): Credential {
    return new Credential(r.threadId, CredentialBody.fromProto(r.body!));
  }

  public toJson(): Promise<string> {
    const bridge = new BloockBridge();

    const req = CredentialToJsonRequest.fromPartial({
      configData: NewConfigData(undefined),
      credential: this.toProto()
    });

    return bridge
      .getIdentity()
      .CredentialToJson(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.json;
      });
  }

  static fromJson(json: string): Promise<Credential> {
    const bridge = new BloockBridge();

    const req = CredentialFromJsonRequest.fromPartial({
      configData: NewConfigData(undefined),
      json: json
    });

    return bridge
      .getIdentity()
      .CredentialFromJson(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Credential.fromProto(res.credential!);
      });
  }
}
