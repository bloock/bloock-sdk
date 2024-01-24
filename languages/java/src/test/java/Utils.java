import com.bloock.sdk.Bloock;
import java.util.Random;

public class Utils {
  static void initSdk() {
    Bloock.apiKey = System.getenv("API_KEY");
    String apiHost = System.getenv("API_HOST");

    if (apiHost != null) {
      Bloock.apiHost = apiHost;
    }

    Bloock.disableAnalytics = true;
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

    Bloock.disableAnalytics = true;
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
}
