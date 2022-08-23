import { BloockBridge } from "./bridge/bridge";
import * as BloockPb from "./bridge/proto/bloock";

async function main() {
  let bridge = new BloockBridge();
  let request = BloockPb.HelloRequest.fromPartial({
    name: "Marc",
  });

  let client = bridge.getGreeting();
  client.sayHello(request, (err, res) => {
    console.log(`Response 1: ${JSON.stringify(res)}`);
    console.error(`Response 1 error: ${err}`);
  });

  client.sayHelloWithError(request, (err, res) => {
    console.log(`Response 2: ${JSON.stringify(res)}`);
    console.error(`Response 2 error: ${err}`);
  });
}

main().then(console.log).catch(console.error);
