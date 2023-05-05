import static org.junit.jupiter.api.Assertions.*;

import com.bloock.sdk.client.AuthenticityClient;
import com.bloock.sdk.client.KeyClient;
import com.bloock.sdk.client.RecordClient;
import com.bloock.sdk.entity.authenticity.*;
import com.bloock.sdk.entity.key.*;
import com.bloock.sdk.entity.record.Record;
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
  void signLocalEcdsa() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    AuthenticityClient authenticityClient = new AuthenticityClient();
    Signature signature =
        authenticityClient.sign(record, new EcdsaSigner(new SignerArgs(localKey)));

    assertNotNull(signature);
  }

  @Test
  void signManagedEcdsa() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    KeyClient keyClient = new KeyClient();
    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k));

    AuthenticityClient authenticityClient = new AuthenticityClient();
    Signature signature =
        authenticityClient.sign(record, new EcdsaSigner(new SignerArgs(managedKey)));

    assertNotNull(signature);
  }

  @Test
  void verifyLocalEcdsa() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(new SignerArgs(localKey)))
            .build();

    boolean valid = authenticityClient.verify(record);
    assertTrue(valid);
  }

  @Test
  void verifyManagedEcdsa() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k));

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(new SignerArgs(managedKey)))
            .build();

    boolean valid = authenticityClient.verify(record);
    assertTrue(valid);
  }

  @Test
  void signLocalEns() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    AuthenticityClient authenticityClient = new AuthenticityClient();
    Signature signature = authenticityClient.sign(record, new EnsSigner(new SignerArgs(localKey)));

    assertNotNull(signature);
  }

  @Test
  void signManagedEns() throws Exception {
    RecordClient recordClient = new RecordClient();
    Record record = recordClient.fromString("Hello world").build();

    KeyClient keyClient = new KeyClient();
    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k));

    AuthenticityClient authenticityClient = new AuthenticityClient();
    Signature signature =
        authenticityClient.sign(record, new EnsSigner(new SignerArgs(managedKey)));

    assertNotNull(signature);
  }

  @Test
  void verifyLocalEns() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EnsSigner(new SignerArgs(localKey)))
            .build();

    boolean valid = authenticityClient.verify(record);
    assertTrue(valid);
  }

  @Test
  void verifyManagedEns() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    ManagedKey managedKey =
        keyClient.newManagedKey(new ManagedKeyParams(KeyProtectionLevel.SOFTWARE, KeyType.EcP256k));

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EnsSigner(new SignerArgs(managedKey)))
            .build();

    boolean valid = authenticityClient.verify(record);
    assertTrue(valid);
  }

  @Test
  void getSignatures() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(new SignerArgs(localKey)))
            .build();

    List<Signature> signatures = authenticityClient.getSignatures(record);

    assertEquals(signatures.size(), 1);
    assertEquals(
        SignatureAlg.fromString(signatures.get(0).getHeader().getAlg()), SignatureAlg.ECDSA);
  }

  @Test
  void getEmptySignatureCommonName() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(new SignerArgs(localKey)))
            .build();

    List<Signature> signatures = authenticityClient.getSignatures(record);

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

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    String commonName = "common_name";
    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EcdsaSigner(new SignerArgs(localKey, commonName)))
            .build();

    List<Signature> signatures = authenticityClient.getSignatures(record);

    String name = authenticityClient.getSignatureCommonName(signatures.get(0));
    assertEquals(name, commonName);
  }

  @Test
  void getEnsSignatureCommonName() throws Exception {
    RecordClient recordClient = new RecordClient();
    AuthenticityClient authenticityClient = new AuthenticityClient();

    KeyClient keyClient = new KeyClient();
    LocalKey localKey = keyClient.newLocalKey(KeyType.EcP256k);

    Record record =
        recordClient
            .fromString("Hello world")
            .withSigner(new EnsSigner(new SignerArgs(localKey)))
            .build();

    List<Signature> signatures = authenticityClient.getSignatures(record);
    Signature signature = signatures.get(0);

    signature.setSignature(
        "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601");
    signature.setMessageHash("7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6");

    String name = authenticityClient.getSignatureCommonName(signature);
    assertEquals(name, "vitalik.eth");
  }
}
