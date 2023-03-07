<?php

namespace Bloock\Bridge;

use Bloock\AuthenticityServiceClient;
use Bloock\AvailabilityServiceClient;
use Bloock\EncryptionServiceClient;
use Bloock\IdentityServiceClient;
use Bloock\IntegrityServiceClient;
use Bloock\KeyServiceClient;
use Bloock\RecordServiceClient;
use Bloock\WebhookServiceClient;

class Bridge
{
    public AuthenticityServiceClient $authenticity;
    public AvailabilityServiceClient $availability;
    public EncryptionServiceClient $encryption;
    public IdentityServiceClient $identity;
    public IntegrityServiceClient $integrity;
    public KeyServiceClient $key;
    public RecordServiceClient $record;
    public WebhookServiceClient $webhook;

    public function __construct()
    {
        $this->authenticity = new AuthenticityServiceClient("", []);
        $this->availability = new AvailabilityServiceClient("", []);
        $this->encryption = new EncryptionServiceClient("", []);
        $this->identity = new IdentityServiceClient("", []);
        $this->integrity = new IntegrityServiceClient("", []);
        $this->key = new KeyServiceClient("", []);
        $this->record = new RecordServiceClient("", []);
        $this->webhook = new WebhookServiceClient("", []);
    }
}