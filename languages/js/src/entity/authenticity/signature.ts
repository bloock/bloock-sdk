import * as proto from "../../bridge/proto/authenticity_entities";
import { SignatureAlg } from "./signature_alg";

export class Signature {
    signature: string;
    alg: string;
    kid: string;
    messageHash: string;

    constructor(
        messageHash: string,
        signature: string,
        alg: string,
        kid: string
    ) {
        this.signature = signature;
        this.alg = alg;
        this.kid = kid;
        this.messageHash = messageHash;
    }

    static fromProto(s: proto.Signature): Signature {
        return new Signature(
            s.messageHash,
            s.signature,
            s.alg,
            s.kid
        );
    }

    toProto(): proto.Signature {
        return proto.Signature.fromPartial({
            signature: this.signature,
            alg: this.alg,
            kid: this.kid,
            messageHash: this.messageHash
        });
    }

    getAlg(): SignatureAlg {
        return SignatureAlg.fromString(this.alg);
    }
}
