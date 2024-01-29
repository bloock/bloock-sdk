import * as proto from "../../bridge/proto/keys_entities";

export class AccessControlSecret {
    secret: string;

    constructor(
        secret: string,
    ) {
        this.secret = secret;
    }

    public toProto(): proto.AccessControlSecret {
        return proto.AccessControlSecret.fromPartial({
            secret: this.secret
        });
    }
}