from bloock._bridge import bridge
from bloock._config.config import Config
from bloock.entity.identity.issuer import Issuer
from bloock.entity.identity.credential_core_builder import CredentialCoreBuilder


class IdentityCoreClient:
    """
    Represents a client for interacting with the [Bloock Identity service](https://dashboard.bloock.com/login).
    """
    def __init__(self, config_data=None) -> None:
        """
        Creates a new instance of the IdentityCoreClient with the provided configuration.
        :type config_data: object
        :rtype: object
        """
        self.bridge_client = bridge.BloockBridge()
        if config_data is None:
            config_data = Config.default()
        self.config_data = config_data


    def build_credential(self, issuer: Issuer, display_name: str, holder_did: str, expiration: int, version: int) -> CredentialCoreBuilder:
        """
        Creates a new credential builder for defining a credential on the Bloock Identity service.
        :type issuer: object
        :type version: object
        :type expiration: object
        :type holder_did: object
        :type display_name: object
        :rtype: object
        """
        return CredentialCoreBuilder(issuer, display_name, holder_did, expiration, version, self.config_data)