import { BloockBridge } from "../../bridge/bridge";
import {
  CredentialToJsonRequest,
  CredentialFromJsonRequest
} from "../../bridge/proto/identity";
import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { NewConfigData } from "../../config/config";
import { CredentialProof } from "./credential_proof";
import { CredentialSchema } from "./credential_schema";
import { CredentialStatus } from "./credential_status";

/**
 * Represents a verifiable credential with its associated information. [Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/).
 */
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

  /**
   * Creates a new Credential instance with the provided details.
   * @param context 
   * @param id 
   * @param type 
   * @param issuanceDate 
   * @param expiration 
   * @param credentialSubject 
   * @param credentialStatus 
   * @param issuer 
   * @param credentialSchema 
   * @param proof 
   */
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

  public toProto(): identityEntitiesProto.Credential {
    return identityEntitiesProto.Credential.fromPartial({
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

  static fromProto(r: identityEntitiesProto.Credential): Credential {
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

  /**
   * Converts the Credential instance to its JSON string representation.
   * @returns 
   */
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

  /**
   * Creates a Credential instance from a JSON string representation.
   * @param json 
   * @returns 
   */
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
