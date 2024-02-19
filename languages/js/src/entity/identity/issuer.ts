import { Key } from "../key/key";
import { Did } from "./did";
import { DidType } from "./did_type";

/**
 * represents a Issuer identity.
 */
export class Issuer {
    did: Did;
    key: Key;

    /**
     * Constructs a Issuer object with the specified parameters.
     * @param did 
     * @param didType 
     */
    constructor(did: string, key: Key, didType?: DidType) {
        this.did = new Did(did, didType);
        this.key = key;
    }
}