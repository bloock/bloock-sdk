import { Key } from "../key/key";
import { Did } from "./did";
import { DidMethod } from "./did_method";

/**
 * represents a Issuer identity.
 */
export class Issuer {
    did: Did;
    key: Key;

    /**
     * Constructs a Issuer object with the specified parameters.
     * @param did 
     * @param didMethod 
     */
    constructor(did: string, key: Key, didMethod: DidMethod) {
        this.did = new Did(did, didMethod);
        this.key = key;
    }
}