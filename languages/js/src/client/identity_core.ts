import { ConfigData } from "../bridge/proto/config";
import { NewConfigData } from "../config/config";
import { CredentialCoreBuilder, Issuer } from "../entity/identity";

/**
 * Represents a client for interacting with the [Bloock Identity service](https://dashboard.bloock.com/login).
 */
export class IdentityCoreClient {
    private configData: ConfigData;

    /**
     * Creates a new instance of the IdentityCoreClient with default configuration.
     * @param configData 
     */
    constructor(configData?: ConfigData) {
        this.configData = NewConfigData(configData);
    }

    /**
     * Creates a new credential builder for defining a credential on the Bloock Identity service.
     * @param issuer 
     * @param schemaId 
     * @param holderDid 
     * @param expiration 
     * @param version 
     * @returns 
     */
    public buildCredential(
        issuer: Issuer,
        schemaId: string,
        holderDid: string,
        expiration: number,
        version: number
    ): CredentialCoreBuilder {
        return new CredentialCoreBuilder(
            issuer,
            schemaId,
            holderDid,
            expiration,
            version,
            this.configData
        );
    }
}