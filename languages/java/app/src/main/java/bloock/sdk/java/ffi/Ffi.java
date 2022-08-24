package bloock.sdk.java.ffi;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.Base64;

import com.sun.jna.Library;
import com.sun.jna.Native;
import sun.security.action.GetPropertyAction;

public class Ffi {
    private static Ffi ffi = null;

    private static BloockLib bloockLib;

    public interface BloockLib extends Library {
        String request(String requestType, String payload);
    }

    protected Ffi() {
        String platform = System.getProperty("os.name").toLowerCase();
        String arch = System.getProperty("os.arch");
        String path = null;
        String prefix = null;
        String suffix = null;

        if (platform.contains("win")) {
            path = "win/polar.dll";
            prefix = "bloock_bridge";
            suffix = ".dll";
        } else if (platform.contains("mac")) {
            path = "x86_64-apple-darwin/libbloock_bridge.a";
            prefix = "libbloock_bridge";
            suffix = ".a";
        } else {
            path = "linux/libpolar.so";
            prefix = "libbloock_bridge";
            suffix = ".so";
        }

        try {
            InputStream input = getClass().getClassLoader().getResourceAsStream(path);
            File file = File.createTempFile(prefix, suffix);
            OutputStream out = Files.newOutputStream(file.toPath());
            int read;
            byte[] bytes = new byte[1024];
            while ((read = input.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            out.close();
            file.deleteOnExit();

            bloockLib = Native.load(file.getAbsolutePath(), BloockLib.class);
        } catch (IOException ignored) {

        }
    }

    public byte[] request(String requestType, String payload) {
        String encodedPayload = Base64.getEncoder().encodeToString(payload.getBytes());
        String encodedResponse = bloockLib.request(requestType, encodedPayload);
        System.out.println("encodedResponse for " + requestType);
        System.out.println(encodedResponse);
        return Base64.getDecoder().decode(encodedResponse.getBytes());
    }

    public static Ffi get() {
        if (ffi == null) {
            ffi = new Ffi();
        }
        return ffi;
    }
}