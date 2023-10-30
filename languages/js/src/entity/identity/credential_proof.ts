import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { SignatureJws } from "../authenticity";
import { Proof } from "../integrity";

export class CredentialProof {
  bloockProof: Proof;
  signatureProof: SignatureJws;

  constructor(bloockProof: Proof, signatureProof: SignatureJws) {
    this.bloockProof = bloockProof;
    this.signatureProof = signatureProof;
  }

  public toProto(): identityEntitiesProto.CredentialProof {
    return identityEntitiesProto.CredentialProof.fromPartial({
      bloockProof: this.bloockProof.toProto(),
      signatureProof: this.signatureProof.toProto()
    });
  }

  static fromProto(r: identityEntitiesProto.CredentialProof): CredentialProof {
    return new CredentialProof(
      Proof.fromProto(r.bloockProof!),
      SignatureJws.fromProto(r.signatureProof!)
    );
  }
}
