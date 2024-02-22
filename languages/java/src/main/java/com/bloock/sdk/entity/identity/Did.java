package com.bloock.sdk.entity.identity;

/**
 * Represents a DID.
 */
public class Did {
    private final String did;
    private final DidMethod didMethod;

    /**
     * Returns a new instance of Did for the given parameters.
     * @param did
     * @param didMethod
     */
    public Did(String did, DidMethod didMethod) {
        this.did = did;
        this.didMethod = didMethod;
    }

    /**
     * Gets the raw did identifier.
     * @return
     */
    public String getDid() {
        return did;
    }

    /**
     * Gets the did type.
     * @return
     */
    public DidMethod getDidMethod() {
        return didMethod;
    }
}
