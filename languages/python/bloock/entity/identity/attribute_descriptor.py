class AttributeDescriptor:
    """
    Represents a descriptor for an attribute.
    """
    def __init__(
            self, display_name: str, technical_name: str, description: str, required: bool
    ) -> None:
        """
        Constructs an AttributeDescriptor object with the specified parameters.
        :type required: object
        :type description: object
        :type technical_name: object
        :type display_name: object
        :rtype: object
        """
        self.display_name = display_name
        self.technical_name = technical_name
        self.description = description
        self.required = required
