<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: webhook.proto

namespace GPBMetadata;

class Webhook
{
    public static $is_initialized = false;

    public static function initOnce() {
        $pool = \Google\Protobuf\Internal\DescriptorPool::getGeneratedPool();

        if (static::$is_initialized == true) {
          return;
        }
        \GPBMetadata\Shared::initOnce();
        \GPBMetadata\Config::initOnce();
        $pool->internalAddGeneratedFile(
            '
�
webhook.protobloockconfig.proto"�
VerifyWebhookSignatureRequest\'
config_data (2.bloock.ConfigData
payload (
header (	
	secretKey (	
enforceTolerance ("_
VerifyWebhookSignatureResponse
is_valid (!
error (2.bloock.ErrorH �B
_error2y
WebhookServiceg
VerifyWebhookSignature%.bloock.VerifyWebhookSignatureRequest&.bloock.VerifyWebhookSignatureResponseBW
com.bloock.sdk.bridge.protoZ8github.com/bloock/bloock-sdk-go/v2/internal/bridge/protobproto3'
        , true);

        static::$is_initialized = true;
    }
}

