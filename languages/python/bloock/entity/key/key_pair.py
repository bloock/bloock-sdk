class KeyPair:
    """
    Represents a pair of public and private keys.
    """
    def __init__(self, public_key: str, private_key: str) -> None:
        """
        Constructs a KeyPair object with the specified parameters.
        :type private_key: object
        :type public_key: object
        :rtype: object
        """
        self.public_key = public_key
        self.private_key = private_key
