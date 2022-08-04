import { BloockBridge } from './bridge/bridge.js';
import { HelloRequest } from './bridge/proto/bloock_pb.js';

async function main() {
  let bridge = new BloockBridge();
  let request = new HelloRequest().setName('Marc');

  let client = bridge.getGreeting();
  client.sayHello(request, (err, res) => {
    console.log(`Response 1: ${res}`);
    console.error(`Response 1 error: ${err}`);
  });

  client.sayHelloWithError(request, (err, res) => {
    console.log(`Response 2: ${res}`);
    console.error(`Response 2 error: ${err}`);
  });
}

main().then(console.log).catch(console.error);
