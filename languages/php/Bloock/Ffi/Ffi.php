<?php

namespace Bloock\Ffi;

final class Ffi
{
    private $ffi;

    public function __construct() {
        $headers = $this->getHeaders();
        $this->ffi = \FFI::cdef($headers, $this->getBinaryPath());
    }

    public function request(string $requestType, string $payload): string {
        $requestPayload = base64_encode($payload);
        $response = $this->ffi->request($requestType, $requestPayload);
        return base64_decode($response);
    }

    private function getHeaders(): string {
        $content = file_get_contents(dirname(__FILE__) . '/native/bloock_bridge.h');
        if (!$content) {
            throw new \Exception("couldn't load header file");
        }
        return $content;
    }

    private function getBinaryPath(): string
    {
        $libDirs = dirname(__FILE__);
        $arch = php_uname("m");
        if (PHP_OS == 'Darwin') {
            if ($arch == 'arm64') {
                $libDirs = $libDirs . '/native/aarch64_apple_darwin/libbloock_bridge.dylib';
            } else {
                $libDirs = $libDirs . '/native/x86_64_apple_darwin/libbloock_bridge.dylib';
            }
        } else if (PHP_OS == 'Linux') {
            $libDirs = $libDirs . '/native/x86_64_unknown_linux_musl/libbloock_bridge.so';
        } else if (PHP_OS == 'Windows') {
            $libDirs = $libDirs . '/native/x86_64_pc_windows_gnu/libbloock_bridge.dll';
        }

        return $libDirs;
    }
}
