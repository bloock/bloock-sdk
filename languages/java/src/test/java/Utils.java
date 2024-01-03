import com.bloock.sdk.Bloock;

public class Utils {
  static void initSdk() {
    Bloock.apiKey = System.getenv("API_KEY");
    String apiHost = System.getenv("API_HOST");
    String identityApiHost = System.getenv("IDENTITY_API_HOST");

    if (apiHost != null) {
      Bloock.apiHost = apiHost;
    }
    if (identityApiHost != null) {
      Bloock.identityApiHost = identityApiHost;
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
}
