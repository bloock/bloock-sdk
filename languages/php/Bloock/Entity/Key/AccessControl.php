<?php

namespace Bloock\Entity\Key;

use Exception;

class AccessControl
{
    public ?AccessControlTotp $accessControlTotp = null;
    public ?AccessControlSecret $accessControlSecret = null;

    /**
     * @throws Exception
     */
    public function __construct($accessControl)
    {
        if ($accessControl instanceof AccessControlTotp) {
            $this->accessControlTotp = $accessControl;
        } else if ($accessControl instanceof AccessControlSecret) {
            $this->accessControlSecret = $accessControl;
        } else {
            throw new Exception("Invalid access control provided");
        }
    }

    public function toProto(): \Bloock\AccessControl
    {
        $s = new \Bloock\AccessControl();

        if ($this->accessControlTotp != null) {
            $s->setAccessControlTotp($this->accessControlTotp->toProto());
        }

        if ($this->accessControlSecret != null) {
            $s->setAccessControlSecret($this->accessControlSecret->toProto());
        }

        return $s;
    }
}
