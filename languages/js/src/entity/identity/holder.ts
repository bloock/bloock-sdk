import { Key } from "../key/key";
import { Did } from "./did";
import { DidMethod } from "./did_method";

/**
 * represents a Holder identity.
 */
export class Holder {
    did: Did;
    key: Key;

    /**
     * Constructs a Holder object with the specified parameters.
     * @param did 
     * @param didMethod 
     */
    constructor(did: string, key: Key, didMethod: DidMethod) {
        this.did = new Did(did, didMethod);
        this.key = key;
    }
}