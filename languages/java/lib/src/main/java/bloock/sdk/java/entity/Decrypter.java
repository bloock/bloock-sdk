package bloock.sdk.java.entity;

import bloock.sdk.java.bridge.proto.RecordOuterClass;
import bloock.sdk.java.bridge.proto.RecordOuterClass.EncryptionAlg;

public interface Decrypter {
  RecordOuterClass.Decrypter toProto();
}

class AesDecrypter implements Decrypter {
  EncryptionAlg alg;
  DecrypterArgs args;

  AesDecrypter(String password) {
    this.alg = EncryptionAlg.A256GCM;
    this.args = new DecrypterArgs(password);
  }

  @Override
  public RecordOuterClass.Decrypter toProto() {
    return RecordOuterClass.Decrypter.newBuilder()
        .setAlg(this.alg)
        .setArgs(this.args.toProto())
        .build();
  }
}

class DecrypterArgs {
  String password;

  DecrypterArgs(String password) {
    this.password = password;
  }

  RecordOuterClass.DecrypterArgs toProto() {
    return RecordOuterClass.DecrypterArgs.newBuilder().setPassword(this.password).build();
  }
}
