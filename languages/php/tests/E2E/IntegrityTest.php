<?php

use Bloock\Bloock;
use Bloock\Client\IntegrityClient;
use Bloock\Client\RecordClient;
use Bloock\Entity\Integrity\Network;
use PHPUnit\Framework\TestCase;

final class IntegrityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Bloock::$apiKey = getenv("API_KEY");
        Bloock::$apiHost = getenv("API_HOST");
    }

    public function testIntegrityEndToEnd()
    {
        $recordClient = new RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $records = array($record);

        $integrityClient = new IntegrityClient();
        $receipts = $integrityClient->sendRecords($records);

        $this->assertNotEmpty($receipts);
        $this->assertEquals($receipts[0]->getRecord(), $records[0]->getHash());

        $anchor = $integrityClient->waitAnchor($receipts[0]->getAnchor());

        $this->assertEquals($receipts[0]->getAnchor(), $anchor->getId());

        $proof = $integrityClient->getProof($records);

        $root = $integrityClient->verifyProof($proof);

        $this->assertNotEquals("", $root);
        $this->assertNotNull($root);

        $timestampValidateRoot = $integrityClient->validateRoot($root, Network::GNOSIS_CHAIN);

        $this->assertTrue($timestampValidateRoot > 0);

        $timestampVerifyRecords = $integrityClient->verifyRecords($records, Network::GNOSIS_CHAIN);

        $this->assertTrue($timestampValidateRoot > 0);
        $this->assertEquals($timestampValidateRoot, $timestampVerifyRecords);
    }
}
