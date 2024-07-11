import * as proto from "../../bridge/proto/bloock_keys_entities";

/**
 * Represents a Time-based One-Time Password ([TOTP](https://datatracker.ietf.org/doc/html/rfc6238)) code used for access control.
 */
export class AccessControlTotp {
  code: string;

  /**
   * Constructs an AccessControlTotp object with the specified parameters.
   * @param code
   */
  constructor(code: string) {
    this.code = code;
  }

  public toProto(): proto.AccessControlTotp {
    return proto.AccessControlTotp.fromPartial({
      code: this.code
    });
  }
}
