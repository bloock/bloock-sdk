package com.bloock.sdk.entity.identity;

/**
 * Represents a DID.
 */
public class Did {
    private final String did;
    private final DidType didType;

    /**
     * Returns a new instance of Did for the given parameters.
     * @param did
     * @param didType
     */
    public Did(String did, DidType didType) {
        this.did = did;
        this.didType = didType;
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
    public DidType getDidType() {
        return didType;
    }
}
