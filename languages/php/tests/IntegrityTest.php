<?php

use PHPUnit\Framework\TestCase;

final class IntegrityTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        \Bloock\Bloock::$apiKey = getenv("API_KEY");
        \Bloock\Bloock::$disableAnalytics = true;
    }

    public function testIntegrityEndToEnd()
    {
        $recordClient = new \Bloock\Client\RecordClient();
        $record = $recordClient->fromString("Hello world")->build();
        $records = array($record);

        $integrityClient = new \Bloock\Client\IntegrityClient();
        $receipts = $integrityClient->sendRecords($records);

        $this->assertNotEmpty($receipts);
        $this->assertEquals($receipts[0]->getRecord(), $records[0]->getHash());

        $anchor = $integrityClient->waitAnchor($receipts[0]->getAnchor());

        $this->assertEquals($receipts[0]->getAnchor(), $anchor->getId());

        $proof = $integrityClient->getProof($records);

        $root = $integrityClient->verifyProof($proof);

        $this->assertNotEquals("", $root);
        $this->assertNotNull($root);

        $timestampValidateRoot = $integrityClient->validateRoot($root, \Bloock\Entity\Integrity\Network::BLOOCK_CHAIN);

        $this->assertTrue($timestampValidateRoot > 0);

        $timestampVerifyRecords = $integrityClient->verifyRecords($records, \Bloock\Entity\Integrity\Network::BLOOCK_CHAIN);

        $this->assertTrue($timestampValidateRoot > 0);
        $this->assertEquals($timestampValidateRoot, $timestampVerifyRecords);
    }

}