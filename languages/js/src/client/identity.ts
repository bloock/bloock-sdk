import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  CreateIssuerRequest,
  ImportIssuerRequest,
  GetCredentialProofRequest,
  RevokeCredentialRequest,
  GetSchemaRequest,
  ForcePublishIssuerStateRequest,
  CreateVerificationRequest,
  WaitVerificationRequest,
  GetVerificationStatusRequest,
  CreateHolderRequest,
  GetCredentialRequest,
  GetCredentialOfferRequest
} from "../bridge/proto/identity";
import { NewConfigData } from "../config/config";
import {
  Holder,
  Issuer,
  IssuerStateReceipt,
  PublishIntervalParams,
  Schema,
  VerificationReceipt
} from "../entity/identity";
import { Credential } from "../entity/identity/credential";
import { CredentialBuilder } from "../entity/identity/credential_builder";
import { CredentialProof } from "../entity/identity/credential_proof";
import { DidType } from "../entity/identity/did_type";
import { SchemaBuilder } from "../entity/identity/schema_builder";
import { Key } from "../entity";

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
   * Creates a new holder identity.
   * @param holderKey 
   * @param didType 
   * @returns 
   */
  public createHolder(
    holderKey: Key,
    didType?: DidType
  ): Promise<Holder> {
    const request = CreateHolderRequest.fromPartial({
      key: holderKey.toProto(),
      didType: didType?.toProto(),
      configData: this.configData
    });

    return this.bridge
      .getIdentity()
      .CreateHolder(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return new Holder(res.did, holderKey, didType);
      });
  }

  /**
   * Creates a new issuer on the Bloock Identity service.
   * @param issuerKey 
   * @param publishInterval 
   * @param didType 
   * @param name 
   * @param description 
   * @param image 
   * @returns 
   */
  public createIssuer(
    issuerKey: Key,
    publishInterval: PublishIntervalParams,
    didType?: DidType,
    name?: string,
    description?: string,
    image?: string
  ): Promise<Issuer> {
    const request = CreateIssuerRequest.fromPartial({
      key: issuerKey.toProto(),
      didType: didType?.toProto(),
      name: name,
      description: description,
      image: image,
      publishInterval: PublishIntervalParams.toProto(publishInterval),
      configData: this.configData
    });

    return this.bridge
      .getIdentity()
      .CreateIssuer(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return new Issuer(res.did, issuerKey, didType);
      });
  }

  /**
   * Gets the issuer based on the issuer key and DID type.
   * @param issuerKey 
   * @param didType 
   * @returns 
   */
  public importIssuer(
    issuerKey: Key,
    didType?: DidType
  ): Promise<Issuer> {
    const request = ImportIssuerRequest.fromPartial({
      key: issuerKey.toProto(),
      didType: didType?.toProto(),
      configData: this.configData
    });

    return this.bridge
      .getIdentity()
      .ImportIssuer(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return new Issuer(res.did, issuerKey, didType);
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
    const request = GetSchemaRequest.fromPartial({
      configData: this.configData,
      id: id
    });

    return this.bridge
      .getIdentity()
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
   * @param issuer 
   * @param schemaId 
   * @param holderDid 
   * @param expiration 
   * @param version 
   * @returns 
   */
  public buildCredential(
    issuer: Issuer,
    schemaId: string,
    holderDid: string,
    expiration: number,
    version: number
  ): CredentialBuilder {
    return new CredentialBuilder(
      issuer,
      schemaId,
      holderDid,
      expiration,
      version,
      this.configData
    );
  }

  /**
   * Retrieves the Verifiable Credential entity based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
   * @param credentialId 
   * @returns 
   */
  public getCredential(credentialId: string): Promise<Credential> {
    const request = GetCredentialRequest.fromPartial({
      configData: this.configData,
      credentialId: credentialId
    });

    return this.bridge
      .getIdentity()
      .GetCredential(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Credential.fromProto(res.credential!);
      });
  }

  /**
   * Retrieves the json raw offer based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
   * @param issuer 
   * @param credentialId 
   * @returns 
   */
  public getCredentialOffer(issuer: Issuer, credentialId: string): Promise<string> {
    const request = GetCredentialOfferRequest.fromPartial({
      configData: this.configData,
      credentialId: credentialId,
      key: issuer.key.toProto()
    });

    return this.bridge
      .getIdentity()
      .GetCredentialOffer(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.credentialOffer!;
      });
  }

  /**
   * Publishes the state of an issuer on the Bloock Identity service.
   * @param issuerDid 
   * @param signer 
   * @returns 
   */
  public forcePublishIssuerState(
    issuer: Issuer
  ): Promise<IssuerStateReceipt> {
    const req = ForcePublishIssuerStateRequest.fromPartial({
      configData: this.configData,
      issuerDid: issuer.did.did,
      key: issuer.key.toProto(),
    });

    return this.bridge
      .getIdentity()
      .ForcePublishIssuerState(req)
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
      .getIdentity()
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
    issuer: Issuer
  ): Promise<boolean> {
    const request = RevokeCredentialRequest.fromPartial({
      configData: this.configData,
      credential: credential.toProto(),
      key: issuer.key.toProto(),
    });

    return this.bridge
      .getIdentity()
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
      .getIdentity()
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
      .getIdentity()
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
      .getIdentity()
      .GetVerificationStatus(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.status;
      });
  }
}
