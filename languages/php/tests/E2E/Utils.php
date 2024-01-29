<?php

use Base32\Base32;

trait Utils
{
    public function generateTOTPClient($secretKey, $timestamp)
    {
        $base32Decoder = new Base32();
        $secretKey = strtoupper(trim($secretKey));
        $secretBytes = $base32Decoder->decode($secretKey);

        $timeBytes = pack('N*', 0, (int)($timestamp / 30));

        $hash = hash_hmac('sha1', $timeBytes, $secretBytes, true);

        $offset = ord($hash[strlen($hash) - 1]) & 0x0F;

        $truncatedHash = unpack('N', substr($hash, $offset, 4))[1] & 0x7FFFFFFF;

        return strval($truncatedHash % 1_000_000);
    }

    public function generateRandomString($length)
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }
}
