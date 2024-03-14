import com.bloock.sdk.Bloock;
import java.util.Random;
import java.util.Arrays;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import org.apache.commons.codec.binary.Base32;

public class Utils {
  static void initSdk() {
    Bloock.apiKey = System.getenv("API_KEY");
    String apiHost = System.getenv("API_HOST");

    if (apiHost != null) {
      Bloock.apiHost = apiHost;
    }
  }

  static void initDevSdk() {
    Bloock.apiKey = System.getenv("DEV_API_KEY");
    String apiHost = System.getenv("DEV_API_HOST");
    String identityApiHost = System.getenv("DEV_IDENTITY_API_HOST");

    if (apiHost != null) {
      Bloock.apiHost = apiHost;
    }
    if (identityApiHost != null) {
      Bloock.identityApiHost = identityApiHost;
    }
  }

  public static String generateRandomString(int length) {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    StringBuilder randomString = new StringBuilder();

    Random random = new Random();

    for (int i = 0; i < length; i++) {
      int randomIndex = random.nextInt(characters.length());
      char randomChar = characters.charAt(randomIndex);
      randomString.append(randomChar);
    }

    return randomString.toString();
  }

  public static String generateTOTPClient(String secretKey, long timestamp) {
    Base32 base32 = new Base32();
    byte[] secretBytes = base32.decode(secretKey.toUpperCase().trim());

    ByteBuffer buffer = ByteBuffer.allocate(8);
    buffer.putLong(timestamp / 30);
    byte[] timeBytes = buffer.array();

    try {
      Mac hmac = Mac.getInstance("HmacSHA1");
      SecretKeySpec keySpec = new SecretKeySpec(secretBytes, "RAW");
      hmac.init(keySpec);

      byte[] hash = hmac.doFinal(timeBytes);

      int offset = hash[hash.length - 1] & 0x0F;

      byte[] truncatedHash = Arrays.copyOfRange(hash, offset, offset + 4);
      truncatedHash[0] &= 0x7F;

      int code = ByteBuffer.wrap(truncatedHash).getInt() % 1_000_000;

      return String.format("%06d", code);
    } catch (NoSuchAlgorithmException | InvalidKeyException e) {
      e.printStackTrace();
      return "";
    }
  }
}
