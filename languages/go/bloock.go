// Package bloock provides a centralized configuration for the Bloock SDK library.
//
// For information about Bloock SDK in Go, see https://bloock.com.
package bloock

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// ApiKey is a string variable representing the API key used for authentication with the Bloock SDK.
// Create one [here].
// [here]: https://dashboard.bloock.com/login
var ApiKey string

// ApiHost is a string variable representing the host URL used for API communication with the Bloock SDK.
var ApiHost string

// IdentityApiHost is a string variable representing the host URL used for Identity Managed API.
// Required to be set for identity-related features of the Bloock SDK.
var IdentityApiHost string = ""

// NetworkConfig is a map variable that holds network configurations associated
// with specific network IDs in the Bloock SDK.
var NetworkConfig map[int32]*proto.NetworkConfig = make(map[int32]*proto.NetworkConfig)

// SetProvider sets the HTTP provider for the specified network in the Bloock SDK configuration.
func SetProvider(network integrity.Network, provider string) {
	if _, ok := NetworkConfig[int32(network)]; ok {
		NetworkConfig[int32(network.Number())].HttpProvider = provider
	} else {
		NetworkConfig[int32(network.Number())] = &proto.NetworkConfig{
			HttpProvider: provider,
		}
	}
}

// SetContractAddress sets the contract address for the specified network in the Bloock SDK configuration.
func SetContractAddress(network integrity.Network, contractAddress string) {
	if _, ok := NetworkConfig[int32(network)]; ok {
		NetworkConfig[int32(network.Number())].ContractAddress = contractAddress
	} else {
		NetworkConfig[int32(network.Number())] = &proto.NetworkConfig{
			ContractAddress: contractAddress,
		}
	}
}
