<?php

namespace Bloock\Bridge;

use Bloock\AuthenticityServiceClient;
use Bloock\AvailabilityServiceClient;
use Bloock\EncryptionServiceClient;
use Bloock\IntegrityServiceClient;
use Bloock\RecordServiceClient;
use Bloock\WebhookServiceClient;

class Bridge
{
    public AuthenticityServiceClient $authenticity;
    public AvailabilityServiceClient $availability;
    public EncryptionServiceClient $encryption;
    public IntegrityServiceClient $integrity;
    public RecordServiceClient $record;
    public WebhookServiceClient $webhook;

    public function __construct() {
        $this->authenticity = new AuthenticityServiceClient("", []);
        $this->availability = new AvailabilityServiceClient("", []);
        $this->encryption = new EncryptionServiceClient("", []);
        $this->integrity = new IntegrityServiceClient("", []);
        $this->record = new RecordServiceClient("", []);
        $this->webhook = new WebhookServiceClient("", []);
    }
}