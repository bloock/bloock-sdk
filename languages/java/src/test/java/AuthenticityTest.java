import static org.junit.jupiter.api.Assertions.*;

import com.bloock.sdk.client.AuthenticityClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.*;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class AuthenticityTest {

  @BeforeAll
  static void beforeAll() {
    Utils.initSdk();
  }

  @Test
  void generateEcdsaKeys() throws Exception {
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair keys = authenticityClient.generateEcdsaKeyPair();

    assertNotNull(keys.getPublicKey());
    assertNotNull(keys.getPrivateKey());
  }

  @Test
  void signEcdsa() throws Exception {
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString("Hello world").build();

    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();
    Signature signature =
        authenticityClient.sign(record, new EcdsaSigner(ecdsaKeyPair.getPrivateKey()));

    assertNotNull(signature);
  }

  @Test
  void verifyEcdsa() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(ecdsaKeyPair.getPrivateKey()))
            .build();

    boolean valid = authenticityClient.verify(record);
    assertTrue(valid);
  }

  @Test
  void signEns() throws Exception {
    RecordClient recordClient = new RecordClient();

    Record record = recordClient.fromString("Hello world").build();

    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();
    Signature signature =
        authenticityClient.sign(record, new EnsSigner(ecdsaKeyPair.getPrivateKey()));

    assertNotNull(signature);
  }

  @Test
  void verifyEns() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EnsSigner(ecdsaKeyPair.getPrivateKey()))
            .build();

    boolean valid = authenticityClient.verify(record);
    assertTrue(valid);
  }

  @Test
  void getRecordSignatures() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(ecdsaKeyPair.getPrivateKey()))
            .build();

    List<Signature> signatures = authenticityClient.getRecordSignatures(record);

    assertEquals(signatures.size(), 1);
    assertEquals(
        SignatureAlg.fromString(signatures.get(0).getHeader().getAlg()), SignatureAlg.ECDSA);
  }

  @Test
  void getEmptySignatureCommonName() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(ecdsaKeyPair.getPrivateKey()))
            .build();

    List<Signature> signatures = authenticityClient.getRecordSignatures(record);

    boolean throwsException = false;
    try {
      authenticityClient.getSignatureCommonName(signatures.get(0));
    } catch (Exception e) {
      throwsException = true;
    }

    assertTrue(throwsException);
  }

  @Test
  void getEcdsaSignatureCommonName() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();

    String commonName = "common_name";
    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(new SignerArgs(ecdsaKeyPair.getPrivateKey(), commonName)))
            .build();

    List<Signature> signatures = authenticityClient.getRecordSignatures(record);

    String name = authenticityClient.getSignatureCommonName(signatures.get(0));
    assertEquals(name, commonName);
  }

  @Test
  void getEnsSignatureCommonName() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    EcdsaKeyPair ecdsaKeyPair = authenticityClient.generateEcdsaKeyPair();

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EnsSigner(ecdsaKeyPair.getPrivateKey()))
            .build();

    List<Signature> signatures = authenticityClient.getRecordSignatures(record);
    Signature signature = signatures.get(0);

    signature.setSignature(
        "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
    signature.setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");

    String name = authenticityClient.getSignatureCommonName(signature);
    assertEquals(name, "vitalik.eth");
  }
}
