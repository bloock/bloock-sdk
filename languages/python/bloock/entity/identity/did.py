from bloock.entity.identity.did_type import DidType


class Did:
    """
    Represents a DID.
    """
    def __init__(self, did: str, did_type: DidType) -> None:
        """
        Returns a new instance of Did for the given parameters.
        :type did: object
        :type did_type: object
        :rtype: object
        """
        self.did = did
        self.did_type = did_type