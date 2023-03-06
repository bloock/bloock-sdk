<?php

namespace Bloock\Bridge;

use Bloock\Ffi\Ffi;

class Connection
{
    private $opts;
    private $ffi;

    public function __construct($hostname, $opts, $channel = null)
    {
        $this->ffi = new Ffi();
        $this->opts = [
            'credentials' => null,
        ];
        // parent::__construct($hostname, $this->opts, $channel);
    }

    protected function _simpleRequest(
        $method,
        $argument,
        $deserialize,
        array $metadata = [],
        array $options = []
    )
    {
        $payload = $argument->serializeToString();
        $res = $this->ffi->request($method, $payload);

        list($className, $deserializeFunc) = $deserialize;
        $obj = new $className();
        $obj->mergeFromString($res);
        return $obj;

    }
}