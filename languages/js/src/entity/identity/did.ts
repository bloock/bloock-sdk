import { DidType } from "./did_type";

/**
 * Represents parameters used for generating DIDs.
 */
export class Did {
    did: string;
    didType?: DidType;

    /**
     * Constructs a Did object with the specified parameters.
     * @param did 
     * @param didType 
     */
    constructor(did: string, didType?: DidType) {
        this.did = did;
        this.didType = didType;
    }
}