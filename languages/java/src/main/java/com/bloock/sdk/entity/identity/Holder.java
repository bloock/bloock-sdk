package com.bloock.sdk.entity.identity;

import com.bloock.sdk.entity.key.Key;

/**
 * Represents a Holder identity.
 */
public class Holder {
    private final Did did;
    private final Key key;

    /**
     * Returns a new instance of Holder identity for the given parameters.
     * @param did
     * @param didType
     * @param key
     */
    public Holder(String did, DidType didType, Key key) {
        this.did = new Did(did, didType);
        this.key = key;
    }

    /**
     * Gets the did object of the holder.
     * @return
     */
    public Did getDid() {
        return did;
    }

    /**
     * Gets the key object of the holder.
     * @return
     */
    public Key getKey() {
        return key;
    }
}