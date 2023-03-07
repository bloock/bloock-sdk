import { BloockBridge } from "../../bridge/bridge";
import { ConfigData } from "../../bridge/proto/config";
import { CreateCredentialOfferRequest } from "../../bridge/proto/identity";
import { BooleanAttribute } from "./boolean_attribute";
import { CredentialOffer } from "./credential_offer";
import { DateAttribute } from "./date_attribute";
import { DateTimeAttribute } from "./datetime_attribute";
import { MultichoiceAttribute } from "./multichoice_attribute";
import { NumberAttribute } from "./number_attribute";

export class CredentialOfferBuilder {
  schemaId: string;
  holderKey: string;
  configData: ConfigData;

  booleanAttributes: BooleanAttribute[];
  dateAttributes: DateAttribute[];
  dateTimeAttributes: DateTimeAttribute[];
  multichoiceAttributes: MultichoiceAttribute[];
  numberAttributes: NumberAttribute[];

  constructor(schemaId: string, holderKey: string, configData: ConfigData) {
    this.schemaId = schemaId;
    this.holderKey = holderKey;
    this.configData = configData;

    this.booleanAttributes = [];
    this.dateAttributes = [];
    this.dateTimeAttributes = [];
    this.multichoiceAttributes = [];
    this.numberAttributes = [];
  }

  public withBoleanAttribute(
    key: string,
    value: boolean
  ): CredentialOfferBuilder {
    this.booleanAttributes.push(new BooleanAttribute(key, value));
    return this;
  }

  public withDateAttribute(key: string, value: Date): CredentialOfferBuilder {
    this.dateAttributes.push(new DateAttribute(key, value.getTime()));
    return this;
  }

  public withDateTimeAttribute(
    key: string,
    value: Date
  ): CredentialOfferBuilder {
    this.dateTimeAttributes.push(new DateTimeAttribute(key, value.getTime()));
    return this;
  }

  public withMultichoiceAttribute(
    key: string,
    value: string
  ): CredentialOfferBuilder {
    this.multichoiceAttributes.push(new MultichoiceAttribute(key, value));
    return this;
  }

  public withNumberAttribute(
    key: string,
    value: number
  ): CredentialOfferBuilder {
    this.numberAttributes.push(new NumberAttribute(key, value));
    return this;
  }

  async build(): Promise<CredentialOffer> {
    const bridge = new BloockBridge();

    const req = CreateCredentialOfferRequest.fromPartial({
      configData: this.configData,
      schemaId: this.schemaId,
      holderKey: this.holderKey,
      booleanAttributes: this.booleanAttributes.map(a => a.toProto()),
      dateAttributes: this.dateAttributes.map(a => a.toProto()),
      datetimeAttributes: this.dateTimeAttributes.map(a => a.toProto()),
      multichoiceAttributes: this.multichoiceAttributes.map(a => a.toProto()),
      numberAttributes: this.numberAttributes.map(a => a.toProto())
    });

    return bridge
      .getIdentity()
      .CreateCredentialOffer(req)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return CredentialOffer.fromProto(res.credentialOffer!);
      });
  }
}
