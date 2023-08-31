<?php

namespace Bloock\Entity\IdentityV2;

use Bloock\Bridge\Bridge;
use Bloock\ConfigData;
use Bloock\PublishIssuerStateRequest;
use Bloock\Signer as SingerProto;
use Bloock\Entity\Authenticity\Signer;
use DateTime;
use Exception;

class IssuerStatePublisher
{
    private string $issuerDid;
    private SingerProto $signer;
    private ConfigData $configData;

    public function __construct(string $issuerDid, ConfigData $configData)
    {
        $this->issuerDid = $issuerDid;
        $this->signer = null;
        $this->configData = $configData;
    }

    public function withSigner(Signer $signer): IssuerStatePublisher
    {
        $this->signer = $signer->toProto();
        return $this;
    }

    public function build(): IssuerStateReceipt
    {
        $bridge = new Bridge();

        $req = new PublishIssuerStateRequest();
        $req->setConfigData($this->configData);
        $req->setIssuerDid($this->issuerDid);
        $req->setSigner($this->signer);

        $res = $bridge->identityV2->PublishIssuerState($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return IssuerStateReceipt::fromProto($res);
    }
}
