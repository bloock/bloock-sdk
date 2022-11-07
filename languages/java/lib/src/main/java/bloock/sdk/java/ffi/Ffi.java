package bloock.sdk.java.ffi;

import com.sun.jna.Library;
import com.sun.jna.Native;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.Base64;

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
      path = "win/bloock_bridge.dll";
      prefix = "bloock_bridge";
      suffix = ".dll";
    } else if (platform.contains("mac")) {
      path = "macos/libbloock_bridge.dylib";
      prefix = "libbloock_bridge";
      suffix = ".dylib";
    } else {
      path = "linux/libbloock_bridge.so";
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

  public byte[] request(String requestType, byte[] payload) {
    String encodedPayload = Base64.getEncoder().encodeToString(payload);
    String encodedResponse = bloockLib.request(requestType, encodedPayload);
    return Base64.getDecoder().decode(encodedResponse.getBytes());
  }

  public static Ffi get() {
    if (ffi == null) {
      ffi = new Ffi();
    }
    return ffi;
  }
}
