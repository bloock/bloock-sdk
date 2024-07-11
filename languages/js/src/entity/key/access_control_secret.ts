import * as proto from "../../bridge/proto/bloock_keys_entities";

/**
 * Represents a secret used for secret-based access control.
 */
export class AccessControlSecret {
  secret: string;

  /**
   * Creates a new AccessControlSecret instance with the provided secret.
   * @param secret
   */
  constructor(secret: string) {
    this.secret = secret;
  }

  public toProto(): proto.AccessControlSecret {
    return proto.AccessControlSecret.fromPartial({
      secret: this.secret
    });
  }
}
