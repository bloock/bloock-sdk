import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  CreateIssuerRequest,
  GetIssuerByKeyRequest,
  GetCredentialProofRequest,
  RevokeCredentialRequestV2,
  GetSchemaRequestV2,
  CreateIdentityV2Request,
  PublishIssuerStateRequest,
  CreateVerificationRequest,
  WaitVerificationRequest,
  GetVerificationStatusRequest
} from "../bridge/proto/identity_v2";
import { NewConfigData } from "../config/config";
import {
  IssuerStateReceipt,
  PublishIntervalParams,
  Schema,
  VerificationReceipt
} from "../entity/identity_v2";
import { Credential } from "../entity/identity_v2/credential";
import { CredentialBuilder } from "../entity/identity_v2/credential_builder";
import { CredentialProof } from "../entity/identity_v2/credential_proof";
import { IdentityKey } from "../entity/identity_v2/identity_key";
import { DidParams } from "../entity/identity_v2/did_params";
import { SchemaBuilder } from "../entity/identity_v2/schema_builder";
import { Signer } from "../entity/authenticity";

/**
 * Represents a client for interacting with the [Bloock Identity service](https://dashboard.bloock.com/login).
 */
export class IdentityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  /**
   * Creates a new instance of the IdentityClient with default configuration.
   * @param configData 
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * Creates a new identity.
   * @param issuerKey 
   * @param didParams 
   * @returns 
   */
  public createIdentity(
    issuerKey: IdentityKey,
    didParams?: DidParams
  ): Promise<string> {
    const request = CreateIdentityV2Request.fromPartial({
      issuerKey: issuerKey.toProto(),
      didParams: didParams?.toProto(),
      configData: this.configData
    });

    return this.bridge
      .getIdentityV2()
      .CreateIdentity(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.did;
      });
  }

  /**
   * Creates a new issuer on the Bloock Identity service.
   * @param issuerKey 
   * @param publishInterval 
   * @param issuerParams 
   * @param name 
   * @param description 
   * @param image 
   * @returns 
   */
  public createIssuer(
    issuerKey: IdentityKey,
    publishInterval: PublishIntervalParams,
    issuerParams?: DidParams,
    name?: string,
    description?: string,
    image?: string
  ): Promise<string> {
    const request = CreateIssuerRequest.fromPartial({
      issuerKey: issuerKey.toProto(),
      issuerParams: issuerParams?.toProto(),
      name: name,
      description: description,
      image: image,
      publishInterval: PublishIntervalParams.toProto(publishInterval),
      configData: this.configData
    });

    return this.bridge
      .getIdentityV2()
      .CreateIssuer(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.did;
      });
  }

  /**
   * Gets the DID of an issuer based on the issuer key.
   * @param issuerKey 
   * @param issuerParams 
   * @returns 
   */
  public getIssuerByKey(
    issuerKey: IdentityKey,
    issuerParams?: DidParams
  ): Promise<string> {
    const request = GetIssuerByKeyRequest.fromPartial({
      issuerKey: issuerKey.toProto(),
      issuerParams: issuerParams?.toProto(),
      configData: this.configData
    });

    return this.bridge
      .getIdentityV2()
      .GetIssuerByKey(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.did;
      });
  }

  /**
   * Creates a new schema builder for defining a schema on the Bloock Identity service.
   * @param displayName 
   * @param schemaType 
   * @param version 
   * @param description 
   * @returns 
   */
  public buildSchema(
    displayName: string,
    schemaType: string,
    version: string,
    description: string
  ): SchemaBuilder {
    return new SchemaBuilder(
      displayName,
      schemaType,
      version,
      description,
      this.configData
    );
  }

  /**
   * Gets a schema from the Bloock Identity service based on the schema ID (ex: Qma1t4uzbnB93E4rasNdu5UWMDh5qg3wMkPm68cnEyfnoM).
   * @param id 
   * @returns 
   */
  public getSchema(id: string): Promise<Schema> {
    const request = GetSchemaRequestV2.fromPartial({
      configData: this.configData,
      id: id
    });

    return this.bridge
      .getIdentityV2()
      .GetSchema(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Schema.fromProto(res.schema!);
      });
  }

  /**
   * Creates a new credential builder for defining a credential on the Bloock Identity service.
   * @param schemaId 
   * @param issuerDid 
   * @param holderDid 
   * @param expiration 
   * @param version 
   * @returns 
   */
  public buildCredential(
    schemaId: string,
    issuerDid: string,
    holderDid: string,
    expiration: number,
    version: number
  ): CredentialBuilder {
    return new CredentialBuilder(
      schemaId,
      issuerDid,
      holderDid,
      expiration,
      version,
      this.configData
    );
  }

  /**
   * Publishes the state of an issuer on the Bloock Identity service.
   * @param issuerDid 
   * @param signer 
   * @returns 
   */
  public publishIssuerState(
    issuerDid: string,
    signer: Signer
  ): Promise<IssuerStateReceipt> {
    const req = PublishIssuerStateRequest.fromPartial({
      configData: this.configData,
      issuerDid: issuerDid,
      signer: signer.toProto()
    });

    return this.bridge
      .getIdentityV2()
      .PublishIssuerState(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return IssuerStateReceipt.fromProto(res.stateReceipt!);
      });
  }

  /**
   * Gets the proof of a credential on the Bloock Identity service.
   * @param issuerDid 
   * @param credentialId 
   * @returns 
   */
  public getCredentialProof(
    issuerDid: string,
    credentialId: string
  ): Promise<CredentialProof> {
    const request = GetCredentialProofRequest.fromPartial({
      issuerDid: issuerDid,
      credentialId: credentialId,
      configData: this.configData
    });

    return this.bridge
      .getIdentityV2()
      .GetCredentialProof(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialProof.fromProto(res.proof!);
      });
  }

  /**
   * Revokes a credential on the Bloock Identity service.
   * @param credential 
   * @param signer 
   * @returns 
   */
  public revokeCredential(
    credential: Credential,
    signer: Signer
  ): Promise<boolean> {
    const request = RevokeCredentialRequestV2.fromPartial({
      configData: this.configData,
      credential: credential.toProto(),
      signer: signer.toProto()
    });

    return this.bridge
      .getIdentityV2()
      .RevokeCredential(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.result!.success!;
      });
  }

  /**
   * Creates a new verification session on the identity managed API provided.
   * @param proofRequest 
   * @returns 
   */
  public createVerification(
    proofRequest: string
  ): Promise<VerificationReceipt> {
    const request = CreateVerificationRequest.fromPartial({
      configData: this.configData,
      proofRequest: proofRequest
    });

    return this.bridge
      .getIdentityV2()
      .CreateVerification(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return VerificationReceipt.fromProto(res.result!);
      });
  }

  /**
   * Waits for the completion of a verification session on the identity managed API provided.
   * @param sessionID 
   * @param timeout 
   * @returns 
   */
  public waitVerification(
    sessionID: number,
    timeout?: number
  ): Promise<boolean> {
    const request = WaitVerificationRequest.fromPartial({
      configData: this.configData,
      sessionId: sessionID,
      timeout: timeout !== null ? timeout : 120000
    });

    return this.bridge
      .getIdentityV2()
      .WaitVerification(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.status;
      });
  }

  /**
   * Gets the status of a verification session on the identity managed API provided.
   * @param sessionID 
   * @returns 
   */
  public getVerificationStatus(sessionID: number): Promise<boolean> {
    const request = GetVerificationStatusRequest.fromPartial({
      configData: this.configData,
      sessionId: sessionID
    });

    return this.bridge
      .getIdentityV2()
      .GetVerificationStatus(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.status;
      });
  }
}
