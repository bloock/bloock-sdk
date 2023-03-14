package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.integrity.Proof;

public class CredentialProof {
    private final Proof bloockProof;
    private final Signature signatureProof;

    public CredentialProof(Proof bloockProof, Signature signatureProof) {
        this.bloockProof = bloockProof;
        this.signatureProof = signatureProof;
    }

    public static CredentialProof fromProto(IdentityEntities.CredentialProof res) {
        return new CredentialProof(Proof.fromProto(res.getBloockProof()), Signature.fromProto(res.getSignatureProof()));
    }

    public IdentityEntities.CredentialProof toProto() {
        return IdentityEntities.CredentialProof.newBuilder()
                .setBloockProof(this.bloockProof.toProto())
                .setSignatureProof(this.signatureProof.toProto())
                .build();
    }

    public Proof getBloockProof() {
        return bloockProof;
    }

    public Signature getSignatureProof() {
        return signatureProof;
    }
}
