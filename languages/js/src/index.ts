import { BloockClient } from "./client";
import { Anchor } from "./bridge/proto/anchor";
import { Network } from "./bridge/proto/config";
import { RecordReceipt } from "./bridge/proto/record";
import './fetch-polyfill';
import { RecordBuilder } from "./builder";

export { BloockClient, Anchor, Network, RecordReceipt, RecordBuilder }

// async function main() {
//   let bridge = new BloockBridge();
//   let config = BloockConfig.ConfigData.fromPartial({
//     config: {
//       host: "https://api.bloock.dev",
//       apiKey: "test_key",
//       waitMessageIntervalFactor: 2,
//       waitMessageIntervalDefault: 0,
//       keyTypeAlgorithm: "EC",
//       ellipticCurveKey: "secp256k1",
//       signatureAlgorithm: "'ES256K'",
//     },
//     networksConfig: {
//       [BloockConfig.Network.ETHEREUM_MAINNET]: {
//         ContractAddress: "0x522b2040CdfD247ED60921623044dF1c929524B7",
//         ContractAbi: "",
//         HttpProvider: "",
//       },
//     }
//   })

//   let greetingRequest = BloockPb.HelloRequest.fromPartial({
//     config: config,
//     name: "Marc",
//   });
//   let greetingClient = bridge.getGreeting();
//   greetingClient.sayHelloWithError(greetingRequest, (err, res) => {
//     console.log(`Response 1: ${JSON.stringify(res)}`);
//     console.error(`Response 1 error: ${err}`);
//   });


//   let anchorRequest = BloockAnchor.GetAnchorRequest.fromPartial({
//     configData: config,
//     anchorId: 500,
//   });
//   let anchorClient = bridge.getAnchor();
//   anchorClient.getAnchor(anchorRequest, (err, res) => {
//     console.log(`Response 2: ${JSON.stringify(res)}`);
//     console.error(`Response 2 error: ${err}`);
//   });

// }

// main().then().catch(console.error);
