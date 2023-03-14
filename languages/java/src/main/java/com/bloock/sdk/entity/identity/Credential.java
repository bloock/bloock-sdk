package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.bridge.proto.Shared;
import com.bloock.sdk.config.Config;

public class Credential {

    private final String threadId;
    private final CredentialBody body;

    public Credential(String threadId, CredentialBody body) {
        this.threadId = threadId;
        this.body = body;
    }

    public static Credential fromProto(IdentityEntities.Credential res) {
        return new Credential(res.getThreadId(), CredentialBody.fromProto(res.getBody()));
    }

    public static Credential fromJson(String json) throws Exception {
        Bridge bridge = new Bridge();

        Identity.CredentialFromJsonRequest req = Identity.CredentialFromJsonRequest.newBuilder()
                .setConfigData(Config.newConfigDataDefault())
                .setJson(json)
                .build();

        Identity.CredentialFromJsonResponse response = bridge.getIdentity().credentialFromJson(req);

        if (response.getError() != Shared.Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return Credential.fromProto(response.getCredential());
    }

    public IdentityEntities.Credential toProto() {
        return IdentityEntities.Credential.newBuilder()
                .setThreadId(this.threadId)
                .setBody(this.body.toProto())
                .build();
    }

    public String toJson() throws Exception {
        Bridge bridge = new Bridge();

        Identity.CredentialToJsonRequest req = Identity.CredentialToJsonRequest.newBuilder()
                .setConfigData(Config.newConfigDataDefault())
                .setCredential(this.toProto())
                .build();

        Identity.CredentialToJsonResponse response = bridge.getIdentity().credentialToJson(req);

        if (response.getError() != Shared.Error.getDefaultInstance()) {
            throw new Exception(response.getError().getMessage());
        }

        return response.getJson();
    }

    public String getThreadId() {
        return threadId;
    }

    public CredentialBody getBody() {
        return body;
    }
}
