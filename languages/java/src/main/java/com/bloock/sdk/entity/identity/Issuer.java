package com.bloock.sdk.entity.identity;

import com.bloock.sdk.entity.key.Key;

/**
 * Represents an Issuer identity.
 */
public class Issuer {
    private final Did did;
    private final Key key;

    /**
     * Returns a new instance of Issuer identity for the given parameters.
     * @param did
     * @param didType
     * @param key
     */
    public Issuer(String did, DidMethod didMethod, Key key) {
        this.did = new Did(did, didMethod);
        this.key = key;
    }

    /**
     * Gets the did object of the issuer.
     * @return
     */
    public Did getDid() {
        return did;
    }

    /**
     * Gets the key object of the issuer.
     * @return
     */
    public Key getKey() {
        return key;
    }
}
