import { BloockBridge } from "../bridge/bridge";
import { ConfigData } from "../bridge/proto/config";
import { CreateCredentialOfferRequest } from "../bridge/proto/identity";
import * as identityEntitiesProto from "../bridge/proto/identity_entities";
import { CredentialOffer } from "./credential_offer";

class Attribute<T> {
  id: string;
  value: T;

  constructor(id: string, value: T) {
    this.id = id;
    this.value = value;
  }
}

class BooleanAttribute extends Attribute<boolean> {
  public toProto(): identityEntitiesProto.BooleanAttribute {
    return identityEntitiesProto.BooleanAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttribute
  ): BooleanAttribute {
    return new BooleanAttribute(r.id, r.value);
  }
}

class DateAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.DateAttribute {
    return identityEntitiesProto.DateAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(r: identityEntitiesProto.DateAttribute): DateAttribute {
    return new DateAttribute(r.id, r.value);
  }
}

class DateTimeAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.DateTimeAttribute {
    return identityEntitiesProto.DateTimeAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttribute
  ): DateTimeAttribute {
    return new DateTimeAttribute(r.id, r.value);
  }
}

class MultichoiceAttribute extends Attribute<string> {
  public toProto(): identityEntitiesProto.MultiChoiceAttribute {
    return identityEntitiesProto.MultiChoiceAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.MultiChoiceAttribute
  ): MultichoiceAttribute {
    return new MultichoiceAttribute(r.id, r.value);
  }
}

class NumberAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.NumberAttribute {
    return identityEntitiesProto.NumberAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(r: identityEntitiesProto.NumberAttribute): NumberAttribute {
    return new NumberAttribute(r.id, r.value);
  }
}

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
