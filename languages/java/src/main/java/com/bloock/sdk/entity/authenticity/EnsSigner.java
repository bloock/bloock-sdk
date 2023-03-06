package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.AuthenticityEntities.SignerAlg;

public class EnsSigner implements Signer {
    AuthenticityEntities.SignerAlg alg;
    SignerArgs args;

    public EnsSigner(String privateKey) {
        this.alg = SignerAlg.ENS;
        this.args = new SignerArgs(privateKey);
    }

    @Override
    public AuthenticityEntities.Signer toProto() {
        return AuthenticityEntities.Signer.newBuilder()
                .setAlg(this.alg)
                .setArgs(this.args.toProto())
                .build();
    }
}
