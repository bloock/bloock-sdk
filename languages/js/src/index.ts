import { IdentityClient } from "./client";
import "./pollyfills";

export * from "./client";
export * from "./entity";
export { Bloock } from "./bloock";

async function main() {
  let identityClient = new IdentityClient();

  let holder = await identityClient.createIdentity();
  console.log(holder);

  // public key -> did
  // public key -> EcdsaPublicKey -> X, Y -> Keccak256(X, Y) -> did:iden3:main:{27 PRIMER BYTES DEL HASH}{CHECSUM}
  // EN GO: veure funció createdid al servei d'identitat
  // exemple: PENDENT EDU

  let schema = await identityClient.getSchema(
    "QmNgN3wZ1YH8Z3zfutzpgbXJ6SUobs6SZjwm6phVJTcDEf"
  );

  console.log(schema);

  // schema = await identityClient
  //   .buildSchema("Test Schema", "test_schema")
  //   .addBooleanAttribute("Bool Attribute", "bool_attribute")
  //   .build();

  // console.log(schema);

  let credentialReceipt = await identityClient
    .buildCredential(
      "QmNgN3wZ1YH8Z3zfutzpgbXJ6SUobs6SZjwm6phVJTcDEf",
      holder.key
    )
    .withBoleanAttribute("bool_attribute", false)
    .build();

  // espera a anchor

  let offer = await identityClient.getOffer(credentialReceipt.id);
  console.log(offer);

  let credential = await identityClient.redeemOffer(offer, holder.privateKey);
  console.log(credential);
}

main()
  .then(console.log)
  .catch(console.error);
