<?php

namespace Bloock\Client;

use Bloock\Bridge\Bridge;
use Bloock\Config\Config;
use Bloock\ConfigData;
use Bloock\Entity\Availability\Loader;
use Bloock\Entity\Availability\Publisher;
use Bloock\Entity\Availability\PublishResponse;
use Bloock\Entity\Record\Record;
use Bloock\PublishRequest;
use Bloock\RetrieveRequest;
use Exception;

/**
 * Represents a client for interacting with the [Bloock Availability service](https://dashboard.bloock.com/login).
 */
class AvailabilityClient
{
    private $bridge;
    private $config;

    /**
     * Creates a new instance of the AvailabilityClient with the provided configuration.
     * @param ConfigData|null $config
     */
    public function __construct(ConfigData $config = null)
    {
        $this->bridge = new Bridge();
        if ($config != null) {
            $this->config = Config::newConfigData($config);
        } else {
            $this->config = Config::newConfigDataDefault();
        }

    }

    /**
     * Publishes a Bloock record to the Availability service using the specified publisher.
     * @param Record $record
     * @param Publisher $publisher
     * @return PublishResponse
     * @throws Exception
     */
    public function publish(Record $record, Publisher $publisher): PublishResponse
    {
        $req = new PublishRequest();
        $req->setConfigData($this->config)->setRecord($record->toProto())->setPublisher($publisher->toProto());

        $res = $this->bridge->availability->Publish($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return PublishResponse::fromProto($res);
    }

    /**
     * Gets a Bloock record from the Availability service using the specified loader.
     * @param Loader $loader
     * @return Record
     * @throws Exception
     */
    public function retrieve(Loader $loader): Record
    {
        $req = new RetrieveRequest();
        $req->setConfigData($this->config)->setLoader($loader->toProto());

        $res = $this->bridge->availability->Retrieve($req);

        if ($res->getError() != null) {
            throw new Exception($res->getError()->getMessage());
        }

        return Record::fromProto($res->getRecord(), $this->config);
    }
}