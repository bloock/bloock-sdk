import { BloockClient } from './client';
import { Record } from './record';
import { NetworkConfiguration } from './types/configuration';
import { Network } from './types/networks';
import { Proof } from './types/proof';
import { RecordReceipt } from './types/record-receipt';

export {
  BloockClient,
  Record,
  RecordReceipt,
  Proof,
  Network,
  NetworkConfiguration,
};

async function main() {
  const client = new BloockClient(
    'test_8cq2kKTtGOsHm32oUwukf8NQ46Ozxg62aB4gfZTf6HQWPfzwsB1vM3-k0Sksh8x4'
  );

  const record = await Record.fromString(randomStr(64));
  console.log(record);
  console.log(record.getHash());

  const receipt = await client.sendRecords([record]);
  console.log(receipt);
}

main().then().catch(console.error);

function randomStr(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
