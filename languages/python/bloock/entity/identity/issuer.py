from bloock.entity.identity.did_method import DidMethod
from bloock.entity.key.key import Key


class Issuer:
    """
    Represents a Issuer identity.
    """
    def __init__(self, did: str, did_method: DidMethod, key: Key) -> None:
        """
        Returns a new instance of Issuer identity for the given parameters.
        :type did: object
        :type did_method: object
        :type key: object
        :rtype: object
        """
        self.did = did
        self.did_method = did_method
        self.key = key