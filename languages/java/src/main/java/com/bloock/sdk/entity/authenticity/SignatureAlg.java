package com.bloock.sdk.entity.authenticity;

public enum SignatureAlg {
    ECDSA,
    ENS,
    UNRECOGNIZED;

    public static SignatureAlg fromString(String alg) {
        switch (alg) {
            case "ES256K":
                return SignatureAlg.ECDSA;
            case "ENS":
                return SignatureAlg.ENS;
            default:
                return SignatureAlg.UNRECOGNIZED;
        }
    }
}
