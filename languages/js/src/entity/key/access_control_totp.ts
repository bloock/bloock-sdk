import * as proto from "../../bridge/proto/keys_entities";

export class AccessControlTotp {
    code: string;

    constructor(
        code: string,
    ) {
        this.code = code;
    }

    public toProto(): proto.AccessControlTotp {
        return proto.AccessControlTotp.fromPartial({
            code: this.code
        });
    }
}