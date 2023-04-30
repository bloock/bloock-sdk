<?php

use Bloock\Bloock;
use Bloock\Client\RecordClient;
use PHPUnit\Framework\TestCase;

final class CompatTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$disableAnalytics = true;
    }

    public function testCompat()
    {
        $recordClient = new RecordClient();

        $record = $recordClient->fromString("Hello world")->build();
        $hash = $record->getHash();
        $this->assertEquals("ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", $hash);
    }
}