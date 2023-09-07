import { BloockBridge } from "../../bridge/bridge";
import {
  CredentialToJsonRequestV2,
  CredentialFromJsonRequestV2
} from "../../bridge/proto/identity_v2";
import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { NewConfigData } from "../../config/config";
import { CredentialProof } from "./credential_proof";
import { CredentialSchema } from "./credential_schema";
import { CredentialStatus } from "./credential_status";

export class Credential {
  context: string[];
  id: string;
  type: string[];
  issuanceDate: string;
  expiration: string;
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
    expiration: string,
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
    this.expiration = expiration;
    this.credentialStatus = credentialStatus;
    this.credentialSubject = credentialSubject;
    this.issuer = issuer;
    this.credentialSchema = credentialSchema;
    this.proof = proof;
  }

  public toProto(): identityEntitiesProto.CredentialV2 {
    return identityEntitiesProto.CredentialV2.fromPartial({
      context: this.context,
      id: this.id,
      type: this.type,
      issuanceDate: this.issuanceDate,
      expiration: this.expiration,
      credentialStatus: this.credentialStatus.toProto(),
      credentialSubject: this.credentialSubject,
      issuer: this.issuer,
      credentialSchema: this.credentialSchema.toProto(),
      proof: this.proof.toProto()
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialV2): Credential {
    return new Credential(
      r.context,
      r.id,
      r.type,
      r.issuanceDate,
      r.expiration,
      r.credentialSubject,
      CredentialStatus.fromProto(r.credentialStatus!),
      r.issuer,
      CredentialSchema.fromProto(r.credentialSchema!),
      CredentialProof.fromProto(r.proof!)
    );
  }

  public toJson(): Promise<string> {
    const bridge = new BloockBridge();

    const req = CredentialToJsonRequestV2.fromPartial({
      configData: NewConfigData(undefined),
      credential: this.toProto()
    });

    return bridge
      .getIdentityV2()
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

    const req = CredentialFromJsonRequestV2.fromPartial({
      configData: NewConfigData(undefined),
      json: json
    });

    return bridge
      .getIdentityV2()
      .CredentialFromJson(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Credential.fromProto(res.credential!);
      });
  }
}
