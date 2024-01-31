<?php

trait Utils
{
    /*public function generateTOTPClient($secretKey)
    {
        $timestamp = time();

        $otp = TOTP::create($secretKey);

        $code = $otp->at($timestamp);

        return $code;
    }*/

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
