import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import {
  CreateIdentityRequest,
  CredentialOfferRedeemRequest,
  GetOfferRequest,
  GetSchemaRequest,
  LoadIdentityRequest,
  RevokeCredentialRequest,
  VerifyCredentialRequest,
  WaitOfferRequest
} from "../bridge/proto/identity";
import { NewConfigData } from "../config/config";
import { Credential, CredentialBuilder } from "../entity/identity";
import { CredentialOffer } from "../entity/identity";
import { CredentialVerification } from "../entity/identity";
import { Identity } from "../entity/identity";
import { Schema } from "../entity/identity";
import { SchemaBuilder } from "../entity/identity";

export class IdentityLegacyClient {
  private bridge: BloockBridge;
  private configData: ConfigData;

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
  constructor(configData?: ConfigData) {
    this.bridge = new BloockBridge();
    this.configData = NewConfigData(configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
  public buildSchema(
    displayName: string,
    technicalName: string
  ): SchemaBuilder {
    return new SchemaBuilder(displayName, technicalName, this.configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
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
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
  public buildCredential(
    schemaId: string,
    holderKey: string
  ): CredentialBuilder {
    return new CredentialBuilder(schemaId, holderKey, this.configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
  public getOffer(id: string): Promise<CredentialOffer> {
    const request = GetOfferRequest.fromPartial({
      configData: this.configData,
      id: id
    });

    return this.bridge
      .getIdentity()
      .GetOffer(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialOffer.fromProto(res.offer!);
      });
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
  public waitOffer(offerId: string): Promise<CredentialOffer> {
    const request = WaitOfferRequest.fromPartial({
      configData: this.configData,
      offerId: offerId
    });

    return this.bridge
      .getIdentity()
      .WaitOffer(request)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialOffer.fromProto(res.offer!);
      });
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function instead.
   */
  public revokeCredential(credential: Credential): Promise<boolean> {
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
        return res.result!.success!;
      });
  }
}
