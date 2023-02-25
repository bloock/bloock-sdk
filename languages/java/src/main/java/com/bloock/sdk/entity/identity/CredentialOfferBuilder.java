package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.bridge.proto.Shared;

import java.util.ArrayList;
import java.util.List;

public class CredentialOfferBuilder {
    private String schemaId;
    private String holderKey;
    private Config.ConfigData configData;

    private List<IdentityEntities.BooleanAttribute> booleanAttributes;
    private List<IdentityEntities.DateAttribute> dateAttributes;
    private List<IdentityEntities.DateTimeAttribute> datetimeAttributes;
    private List<IdentityEntities.MultiChoiceAttribute> multichoiceAttributes;
    private List<IdentityEntities.NumberAttribute> numberAttributes;

    public CredentialOfferBuilder(String schemaId, String holderKey, Config.ConfigData configData) {
        this.schemaId = schemaId;
        this.holderKey = holderKey;
        this.configData = configData;

        this.booleanAttributes = new ArrayList<>();
        this.dateAttributes = new ArrayList<>();
        this.datetimeAttributes = new ArrayList<>();
        this.multichoiceAttributes = new ArrayList<>();
        this.numberAttributes = new ArrayList<>();
    }

    public CredentialOfferBuilder withBooleanAttribute(String key, boolean value) {
        this.booleanAttributes.add(new BooleanAttribute(key, value).toProto());
        return this;
    }

    public CredentialOfferBuilder withDateAttribute(String key, Long value) {
        this.dateAttributes.add(new DateAttribute(key, value).toProto());
        return this;
    }

    public CredentialOfferBuilder withDatetimeAttribute(String key, Long value) {
        this.datetimeAttributes.add(new DatetimeAttribute(key, value).toProto());
        return this;
    }

    public CredentialOfferBuilder withMultichoiceAttribute(String key, String value) {
        this.multichoiceAttributes.add(new MultichoiceAttribute(key, value).toProto());
        return this;
    }

    public CredentialOfferBuilder withNumberAttribute(String key, Long value) {
        this.numberAttributes.add(new NumberAttribute(key, value).toProto());
        return this;
    }

    public CredentialOffer build() throws Exception {
        Bridge bridge = new Bridge();

        Identity.CreateCredentialOfferRequest req = Identity.CreateCredentialOfferRequest.newBuilder()
                .setConfigData(this.configData)
                .setSchemaId(this.schemaId)
                .setHolderKey(this.holderKey)
                .addAllBooleanAttributes(this.booleanAttributes)
                .addAllDateAttributes(this.dateAttributes)
                .addAllDatetimeAttributes(this.datetimeAttributes)
                .addAllMultichoiceAttributes(this.multichoiceAttributes)
                .addAllNumberAttributes(this.numberAttributes)
                .build();

        Identity.CreateCredentialOfferResponse response = bridge.getIdentity().createCredentialOffer(req);

        if (response.getError() != Shared.Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return CredentialOffer.fromProto(response.getCredentialOffer());
    }
}
