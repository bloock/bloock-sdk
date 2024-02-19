from bloock.entity.identity.did_type import DidType
from bloock.entity.key.key import Key


class Issuer:
    """
    Represents a Issuer identity.
    """
    def __init__(self, did: str, did_type: DidType, key: Key) -> None:
        """
        Returns a new instance of Issuer identity for the given parameters.
        :type did: object
        :type did_type: object
        :type key: object
        :rtype: object
        """
        self.did = did
        self.did_type = did_type
        self.key = key