package types

type NetworkConfiguration struct {
	ContractAddress string `default:""`
	ContractABI     string `default:""`
	HttpProvider    string `default:""`
}

func NewNetworkConfiguration(contractAddress, contractABI, httpProvider string) NetworkConfiguration {
	return NetworkConfiguration{
		ContractAddress: contractAddress,
		ContractABI:     contractABI,
		HttpProvider:    httpProvider,
	}
}
