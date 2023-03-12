import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
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
}
