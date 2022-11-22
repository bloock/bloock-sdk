class NetworkConfig:
    def __init__(
        self, contract_address: str, contract_abi: str, http_provider: str
    ) -> None:
        self.contract_address = contract_address
        self.contract_abi = contract_abi
        self.http_provider = http_provider
