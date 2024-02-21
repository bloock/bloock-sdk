from bloock.entity.identity.did_method import DidMethod


class Did:
    """
    Represents a DID.
    """
    def __init__(self, did: str, did_method: DidMethod) -> None:
        """
        Returns a new instance of Did for the given parameters.
        :type did: object
        :type did_method: object
        :rtype: object
        """
        self.did = did
        self.did_method = did_method