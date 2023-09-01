class AttributeDescriptor:
    def __init__(
            self, display_name: str, technical_name: str, description: str, required: bool
    ) -> None:
        self.display_name = display_name
        self.technical_name = technical_name
        self.description = description
        self.required = required
