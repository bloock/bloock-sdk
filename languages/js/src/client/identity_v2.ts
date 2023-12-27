import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  CreateIssuerRequest,
  GetIssuerListRequest,
  GetIssuerByKeyRequest,
  GetCredentialProofRequest,
  RevokeCredentialRequestV2,
  GetSchemaRequestV2,
  CreateIdentityV2Request,
  PublishIssuerStateRequest
} from "../bridge/proto/identity_v2";
import { NewConfigData } from "../config/config";
import { IssuerStateReceipt, Schema } from "../entity/identity_v2";
import { Credential } from "../entity/identity_v2/credential";
import { CredentialBuilder } from "../entity/identity_v2/credential_builder";
import { CredentialProof } from "../entity/identity_v2/credential_proof";
import { IdentityKey } from "../entity/identity_v2/identity_key";
import { DidParams } from "../entity/identity_v2/did_params";
import { SchemaBuilder } from "../entity/identity_v2/schema_builder";
import { Signer } from "../entity/authenticity";

export class IdentityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;
  private apiManagedHost: string;

  constructor(apiManagedHost: string, configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
    this.apiManagedHost = apiManagedHost;
  }

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

  public createIssuer(
    issuerKey: IdentityKey,
    issuerParams?: DidParams,
    name?: string,
    description?: string,
    image?: string,
    publishInterval?: number,
  ): Promise<string> {
    const request = CreateIssuerRequest.fromPartial({
      issuerKey: issuerKey.toProto(),
      issuerParams: issuerParams?.toProto(),
      name: name,
      description: description,
      image: image,
      publishInterval: publishInterval,
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

  public getIssuerList(): Promise<string[]> {
    const request = GetIssuerListRequest.fromPartial({
      configData: this.configData
    });

    return this.bridge
      .getIdentityV2()
      .GetIssuerList(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.did;
      });
  }

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

  public buildSchema(
    displayName: string,
    schemaType: string,
    version: string,
    description: string,
    issuerDid: string
  ): SchemaBuilder {
    return new SchemaBuilder(
      displayName,
      schemaType,
      version,
      description,
      issuerDid,
      this.configData
    );
  }

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
      this.apiManagedHost,
      this.configData
    );
  }

  public publishIssuerState(issuerDid: string, signer: Signer): Promise<IssuerStateReceipt> {
    const req = PublishIssuerStateRequest.fromPartial({
      configData: this.configData,
      issuerDid: issuerDid,
      signer: signer.toProto(),
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

  public revokeCredential(credential: Credential, signer: Signer): Promise<boolean> {
    const request = RevokeCredentialRequestV2.fromPartial({
      configData: this.configData,
      credential: credential.toProto(),
      signer: signer.toProto(),
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
}
