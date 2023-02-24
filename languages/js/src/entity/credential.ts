import * as identityEntitiesProto from "../bridge/proto/identity_entities";

export class Credential {
  json: string;

  constructor(json: string) {
    this.json = json;
  }

  public static fromJSON(json: string): Credential {
    return new Credential(json);
  }

  public toJSON(): string {
    return this.json;
  }

  public toProto(): identityEntitiesProto.Credential {
    return identityEntitiesProto.Credential.fromPartial({
      json: this.json
    });
  }

  static fromProto(r: identityEntitiesProto.Credential): Credential {
    return new Credential(r.json);
  }
}
