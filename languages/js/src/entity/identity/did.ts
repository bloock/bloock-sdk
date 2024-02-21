import { DidMethod } from "./did_method";

/**
 * Represents parameters used for generating DIDs.
 */
export class Did {
    did: string;
    didMethod: DidMethod;

    /**
     * Constructs a Did object with the specified parameters.
     * @param did 
     * @param didType 
     */
    constructor(did: string, didMethod: DidMethod) {
        this.did = did;
        this.didMethod = didMethod;
    }
}