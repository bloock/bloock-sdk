package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;
import bloock.sdk.java.bridge.proto.RecordOuterClass.EncryptionAlg;

public interface Encrypter {
  RecordOuterClass.Encrypter toProto();
}

class AesEncrypter implements Encrypter {
  EncryptionAlg alg;
  EncrypterArgs args;

  AesEncrypter(String password) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new EncrypterArgs(password);
  }

  @Override
  public RecordOuterClass.Encrypter toProto() {
    return RecordOuterClass.Encrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}

class EncrypterArgs {
  String password;

  EncrypterArgs(String password) {
    this.password = password;
  }

  RecordOuterClass.EncrypterArgs toProto() {
    return RecordOuterClass.EncrypterArgs.newBuilder().setPassword(this.password).build();
  }
}
