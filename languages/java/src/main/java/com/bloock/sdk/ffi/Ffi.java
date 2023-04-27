package com.bloock.sdk.ffi;

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

    protected Ffi() {
        String platform = System.getProperty("os.name").toLowerCase();
        String arch = System.getProperty("os.arch");
        String path = null;
        String prefix = null;
        String suffix = null;

        String android = System.getProperty("java.vendor");
        if (android != null && android.toLowerCase().contains("android")) {
            if (arch.contains("armv7")) {
                path = "armv7-linux-androideabi/libbloock_bridge.android";
                prefix = "libbloock_bridge";
                suffix = ".android";
            } else {
                path = "aarch64-linux-android/libbloock_bridge.android";
                prefix = "libbloock_bridge";
                suffix = ".android";
            }
        } else {
            if (platform.contains("win")) {
                path = "x86_64-pc-windows-gnu/bloock_bridge.dll";
                prefix = "bloock_bridge";
                suffix = ".dll";
            } else if (platform.contains("mac")) {
                if (arch.contains("aarch64")) {
                    path = "aarch64-apple-darwin/libbloock_bridge.dylib";
                    prefix = "libbloock_bridge";
                    suffix = ".dylib";
                } else {
                    path = "x86_64-apple-darwin/libbloock_bridge.dylib";
                    prefix = "libbloock_bridge";
                    suffix = ".dylib";
                }
            } else {
                if (arch.contains("aarch64")) {
                    path = "aarch64-unknown-linux-gnu/libbloock_bridge.so";
                    prefix = "libbloock_bridge";
                    suffix = ".so";
                } else {
                    path = "x86_64-unknown-linux-gnu/libbloock_bridge.so";
                    prefix = "libbloock_bridge";
                    suffix = ".so";
                }
            }
        }

        try {
            InputStream input = getClass().getClassLoader().getResourceAsStream(path);
            File file = File.createTempFile(prefix, suffix);
            OutputStream out = Files.newOutputStream(file.toPath());
            if (input != null) {
                int read;
                byte[] bytes = new byte[1024];
                while ((read = input.read(bytes)) != -1) {
                    out.write(bytes, 0, read);
                }
            }
            out.close();
            file.deleteOnExit();

            bloockLib = Native.load(file.getAbsolutePath(), BloockLib.class);
        } catch (IOException ignored) {

        }
    }

    public static Ffi get() {
        if (ffi == null) {
            ffi = new Ffi();
        }
        return ffi;
    }

    public byte[] request(String requestType, byte[] payload) {
        String encodedPayload = Base64.getEncoder().encodeToString(payload);
        String encodedResponse = bloockLib.request(requestType, encodedPayload);
        return Base64.getDecoder().decode(encodedResponse.getBytes());
    }

    public interface BloockLib extends Library {
        String request(String requestType, String payload);
    }
}
