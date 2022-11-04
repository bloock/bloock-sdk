package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass.GenerateKeysResponse;

public class Keys {
    String publicKey;
    String privateKey;

    Keys(String publicKey, String privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public static Keys fromProto(GenerateKeysResponse keys) {
        return new Keys(keys.getPublicKey(), keys.getPrivateKey());
    }
}
