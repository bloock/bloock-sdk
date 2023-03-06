import com.bloock.sdk.Bloock;

public class Utils {
    static void initSdk() {
        Bloock.apiKey = System.getenv("API_KEY");
        String apiHost = System.getenv("API_HOST");
        if (apiHost != null) {
            Bloock.apiHost = apiHost;
        }
        Bloock.disableAnalytics = true;
    }
}
