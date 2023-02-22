<?php

use PHPUnit\Framework\TestCase;

final class AvailabilityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        \Bloock\Bloock::$apiKey = getenv("API_KEY");
        \Bloock\Bloock::$disableAnalytics = true;
    }

    public function testPublishHosted()
    {
        $payload = "Hello world";
        $recordClient = new \Bloock\Client\RecordClient();

        $record = $recordClient->fromString($payload)->build();

        $availabilityClient = new \Bloock\Client\AvailabilityClient();
        $result = $availabilityClient->publish($record, new \Bloock\Entity\HostedPublisher());

        $this->assertNotNull($result);
    }

    public function testRetrieveHosted()
    {
        $payload = "Hello world";
        $recordClient = new \Bloock\Client\RecordClient();

        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $availabilityClient = new \Bloock\Client\AvailabilityClient();
        $result = $availabilityClient->publish($record, new \Bloock\Entity\HostedPublisher());

        $result = $availabilityClient->retrieve(new \Bloock\Entity\HostedLoader($result));

        $this->assertEquals($recordHash, $result->getHash());
    }

    public function testPublishIpfs()
    {
        $payload = "Hello world";
        $recordClient = new \Bloock\Client\RecordClient();

        $record = $recordClient->fromString($payload)->build();

        $availabilityClient = new \Bloock\Client\AvailabilityClient();
        $result = $availabilityClient->publish($record, new \Bloock\Entity\IpfsPublisher());

        $this->assertNotNull($result);
    }

    public function testRetrieveIpfs()
    {
        $payload = "Hello world";
        $recordClient = new \Bloock\Client\RecordClient();

        $record = $recordClient->fromString($payload)->build();
        $recordHash = $record->getHash();

        $availabilityClient = new \Bloock\Client\AvailabilityClient();
        $result = $availabilityClient->publish($record, new \Bloock\Entity\IpfsPublisher());

        $result = $availabilityClient->retrieve(new \Bloock\Entity\IpfsLoader($result));

        $this->assertEquals($recordHash, $result->getHash());
    }

}