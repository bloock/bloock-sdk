import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { CredentialProof } from "./credential_proof";
import { CredentialSchema } from "./credential_schema";
import { CredentialStatus } from "./credential_status";

export class CredentialBody {
  context: string[];
  id: string;
  type: string[];
  issuanceDate: string;
  credentialSubject: any;
  credentialStatus: CredentialStatus;
  issuer: string;
  credentialSchema: CredentialSchema;
  proof: CredentialProof;

  constructor(
    context: string[],
    id: string,
    type: string[],
    issuanceDate: string,
    credentialSubject: any,
    credentialStatus: CredentialStatus,
    issuer: string,
    credentialSchema: CredentialSchema,
    proof: CredentialProof
  ) {
    this.context = context;
    this.id = id;
    this.type = type;
    this.issuanceDate = issuanceDate;
    this.credentialStatus = credentialStatus;
    this.credentialSubject = credentialSubject;
    this.issuer = issuer;
    this.credentialSchema = credentialSchema;
    this.proof = proof;
  }

  public toProto(): identityEntitiesProto.CredentialBody {
    return identityEntitiesProto.CredentialBody.fromPartial({
      context: this.context,
      id: this.id,
      type: this.type,
      issuanceDate: this.issuanceDate,
      credentialStatus: this.credentialStatus.toProto(),
      credentialSubject: this.credentialSubject,
      issuer: this.issuer,
      credentialSchema: this.credentialSchema.toProto(),
      proof: this.proof.toProto()
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialBody): CredentialBody {
    return new CredentialBody(
      r.context,
      r.id,
      r.type,
      r.issuanceDate,
      r.credentialSubject,
      CredentialStatus.fromProto(r.credentialStatus!),
      r.issuer,
      CredentialSchema.fromProto(r.credentialSchema!),
      CredentialProof.fromProto(r.proof!)
    );
  }
}
