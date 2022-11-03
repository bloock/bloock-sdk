package bloock.sdk.java;

import java.util.logging.Logger;

import bloock.sdk.java.bridge.Bridge;
import bloock.sdk.java.bridge.proto.AnchorOuterClass;
import bloock.sdk.java.bridge.proto.Config;
import bloock.sdk.java.bridge.proto.AnchorOuterClass.GetAnchorRequest;
import bloock.sdk.java.bridge.proto.Config.ConfigData;
import bloock.sdk.java.bridge.proto.Config.Configuration;

public class App {
    private static final Logger logger = Logger.getLogger(App.class.getName());

    public static void main(String[] args) {
        Bridge client = new Bridge();

        logger.info("Starting request get anchor");

        Configuration config = Config.Configuration.newBuilder()
                .setHost("https://api.bloock.com")
                .setApiKey(System.getenv("API_KEY"))
                .build();

        ConfigData configData = Config.ConfigData
                .newBuilder()
                .setConfig(config)
                .build();

        GetAnchorRequest anchorRequest = AnchorOuterClass.GetAnchorRequest
                .newBuilder()
                .setConfigData(configData)
                .setAnchorId(500)
                .build();

        System.out.println("ANCHOR REQUEST :: =>" + anchorRequest);

        AnchorOuterClass.GetAnchorResponse anchorResponse = client.getAnchor().getAnchor(anchorRequest);
        logger.info("Got response from get anchor");
        logger.info(anchorResponse.toString());
    }
}
