import { LocalKey, ManagedKey } from "../key";

export class IssuerKeyArgs {
    localKey?: LocalKey;
    managedKey?: ManagedKey;

    constructor(key: LocalKey | ManagedKey | string) {
        if (key instanceof LocalKey) {
            this.localKey = key;
        } else if (key instanceof ManagedKey) {
            this.managedKey = key;
        } else {
            this.localKey = new LocalKey("", key);
        }
    }
}