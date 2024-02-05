class Attribute:
    """
    Represents an attribute with an identifier and a corresponding value.
    """
    def __init__(
            self, id: str, value
    ) -> None:
        """
        Constructs an Attribute object with the specified parameters.
        :type value: object
        :type id: object
        :rtype: object
        """
        self.id = id
        self.value = value
