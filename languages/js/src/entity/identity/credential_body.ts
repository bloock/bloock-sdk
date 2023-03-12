import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { CredentialSchema } from "./credential_schema";
import { CredentialStatus } from "./credential_status";

export class CredentialBody {
  id: string;
  type: string[];
  issuanceDate: string;
  credentialSubject: any;
  credentialStatus: CredentialStatus;
  issuer: string;
  credentialSchema: CredentialSchema;
  proof: any;

  constructor(
    id: string,
    type: string[],
    issuanceDate: string,
    credentialSubject: any,
    credentialStatus: CredentialStatus,
    issuer: string,
    credentialSchema: CredentialSchema
  ) {
    this.id = id;
    this.type = type;
    this.issuanceDate = issuanceDate;
    this.credentialStatus = credentialStatus;
    this.credentialSubject = credentialSubject;
    this.issuer = issuer;
    this.credentialSchema = credentialSchema;
  }

  public toProto(): identityEntitiesProto.CredentialBody {
    return identityEntitiesProto.CredentialBody.fromPartial({
      id: this.id,
      type: this.type,
      issuanceDate: this.issuanceDate,
      credentialStatus: this.credentialStatus.toProto(),
      credentialSubject: this.credentialSubject,
      issuer: this.issuer,
      credentialSchema: this.credentialSchema.toProto()
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialBody): CredentialBody {
    return new CredentialBody(
      r.id,
      r.type,
      r.issuanceDate,
      r.credentialSubject,
      CredentialStatus.fromProto(r.credentialStatus!),
      r.issuer,
      CredentialSchema.fromProto(r.credentialSchema!)
    );
  }
}
