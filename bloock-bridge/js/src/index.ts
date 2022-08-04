import 'reflect-metadata'
import { BloockClient } from './client'
import { NetworkConfiguration } from './config/entity/configuration.entity'
import Network from './config/entity/networks.entity'
import { Proof } from './proof/entity/proof.entity'
import { RecordReceipt } from './record/entity/record-receipt.entity'
import { Record } from './record/entity/record.entity'

export { BloockClient, Record, RecordReceipt, Proof, Network, NetworkConfiguration }

const NUM_THREADS = 1

async function main() {
  for (let i = 0; i < 1; ++i) {
    let client = new BloockClient(
      'MXr9zD4rhhz-rzsUigj3P4z0zzIVyy378j-Kjjm0oWtPnIvz86oJfMxFzqcSWEcj'
    )

    let record = await Record.fromString(randomStr(64))

    let receipt = await client.sendRecords([record])

    console.log(`Certification ${i}`)
  }
}

main().then().catch(console.error)

function randomStr(length: number) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
