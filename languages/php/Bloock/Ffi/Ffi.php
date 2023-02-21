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
        $arch = php_uname("m");
        if (PHP_OS == 'Darwin') {
            if ($arch == 'arm64') {
                return dirname(__FILE__) . '/native/aarch64_apple_darwin/libbloock_bridge.dylib';
            } else {
                return dirname(__FILE__) . '/native/x86_64_apple_darwin/libbloock_bridge.dylib';
            }
        } else if (PHP_OS == 'Linux') {
            exec('getconf GNU_LIBC_VERSION', $output, $retVar);
            if ($retVar === 0) {
                return dirname(__FILE__) . '/native/linux/gnu.so';
            }

            return dirname(__FILE__) . '/native/x86_64_unknown_linux_musl/libbloock_bridge.dylib';
        } else {
            return dirname(__FILE__) . '/native/x86_64_unknown_linux_musl/libbloock_bridge.dylib';
        }
    }
}
