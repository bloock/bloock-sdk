import * as proto from "../../bridge/proto/keys_entities";
import { AccessControlSecret } from "./access_control_secret";
import { AccessControlTotp } from "./access_control_totp";

export class AccessControl {
    accessControlTotp?: AccessControlTotp;
    accessControlSecret?: AccessControlSecret;

    constructor(
        accessControl: AccessControlTotp | AccessControlSecret,
    ) {
        if (accessControl instanceof AccessControlTotp) {
            this.accessControlTotp = accessControl;
        } else if (accessControl instanceof AccessControlSecret) {
            this.accessControlSecret = accessControl;
        } else {
            throw new Error("invalid access control provided");
        }
    }

    public toProto(): proto.AccessControl {
        let accessControlTotp: proto.AccessControlTotp | undefined;
        if (this.accessControlTotp) {
            accessControlTotp = this.accessControlTotp && this.accessControlTotp.toProto();
        }

        let accessControlSecret: proto.AccessControlSecret | undefined;
        if (this.accessControlSecret) {
            accessControlSecret = this.accessControlSecret && this.accessControlSecret.toProto();
        }

        return proto.AccessControl.fromPartial({
            accessControlTotp: accessControlTotp,
            accessControlSecret: accessControlSecret,
        });
    }
}