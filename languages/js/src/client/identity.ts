import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  CreateIdentityRequest,
  CredentialOfferRedeemRequest,
  GetSchemaRequest,
  LoadIdentityRequest,
  RevokeCredentialRequest,
  VerifyCredentialRequest
} from "../bridge/proto/identity";
import { NewConfigData } from "../config/config";
import { Credential } from "../entity/credential";
import { CredentialOffer } from "../entity/credential_offer";
import { CredentialOfferBuilder } from "../entity/credential_offer_builder";
import { CredentialVerification } from "../entity/credential_verification";
import { Identity } from "../entity/identity";
import { Schema } from "../entity/schema";
import { SchemaBuilder } from "../entity/schema_builder";

export class IdentityClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  public createIdentity(): Promise<Identity> {
    const request = CreateIdentityRequest.fromPartial({
      configData: this.configData
    });

    return this.bridge
      .getIdentity()
      .CreateIdentity(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Identity.fromProto(res.identity!);
      });
  }

  public loadIdentity(mnemonic: string): Promise<Identity> {
    const request = LoadIdentityRequest.fromPartial({
      configData: this.configData,
      mnemonic: mnemonic
    });

    return this.bridge
      .getIdentity()
      .LoadIdentity(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Identity.fromProto(res.identity!);
      });
  }

  public buildSchema(
    displayName: string,
    technicalName: string
  ): SchemaBuilder {
    return new SchemaBuilder(displayName, technicalName, this.configData);
  }

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

  public buildOffer(
    schemaId: string,
    holderKey: string
  ): CredentialOfferBuilder {
    return new CredentialOfferBuilder(schemaId, holderKey, this.configData);
  }

  public redeemOffer(
    credentialOffer: CredentialOffer,
    holderPrivateKey: string
  ): Promise<Credential> {
    const request = CredentialOfferRedeemRequest.fromPartial({
      configData: this.configData,
      credentialOffer: credentialOffer.toProto(),
      identityPrivateKey: holderPrivateKey
    });

    return this.bridge
      .getIdentity()
      .CredentialOfferRedeem(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return Credential.fromProto(res.credential!);
      });
  }

  public verifyCredential(
    credential: Credential
  ): Promise<CredentialVerification> {
    const request = VerifyCredentialRequest.fromPartial({
      configData: this.configData,
      credential: credential.toProto()
    });

    return this.bridge
      .getIdentity()
      .VerifyCredential(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialVerification.fromProto(res.result!);
      });
  }

  public revokeCredential(credential: Credential): Promise<number> {
    const request = RevokeCredentialRequest.fromPartial({
      configData: this.configData,
      credential: credential.toProto()
    });

    return this.bridge
      .getIdentity()
      .RevokeCredential(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.result!.timestamp!;
      });
  }
}
