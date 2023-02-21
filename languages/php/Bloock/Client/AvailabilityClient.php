<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Loader;
use Bloock\Entity\Publisher;
use Bloock\Entity\Record;
use Bloock\Entity\Signature;
use Bloock\Entity\Signer;
use Bloock\PublishRequest;
use Bloock\RetrieveRequest;
use Bloock\SignRequest;

class AvailabilityClient
{
    private $bridge;
    private $config;

    public function __construct(ConfigData $config = null) {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }

    }

    public function publish(Record $record, Publisher $publisher): string {
        $req = new PublishRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setPublisher($publisher->toProto());

        $res = $this->bridge->availability->Publish($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return $res->getId();
    }

    public function retrieve(Loader $loader): Record {
        $req = new RetrieveRequest();
        $req->setConfigData($this->config)->setLoader($loader->toProto());

        $res = $this->bridge->availability->Retrieve($req);

        if ($res->getError() != null) {
            throw new \Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->config);
    }
}