const {
  RecordClient,
  Bloock,
  Signer,
  KeyClient,
  LocalCertificateParams,
  KeyType,
  SubjectCertificateParams
} = require("./dist");
const fs = require("fs");

async function main() {
  Bloock.setApiKey(
    "test_lLy9zS0PDsQc3W03OMo02jreBNa9Al9D2R-cq4WQEjzteY9Mm31G32S248oMoTq5"
  );

  const recordClient = new RecordClient();
  const keyClient = new KeyClient();
  const file = fs.readFileSync("/Users/marcbaque/Desktop/certifier-basic.png");

  const certificate = await keyClient.newLocalCertificate(
    new LocalCertificateParams(
      KeyType.Rsa4096,
      new SubjectCertificateParams("Bloock", "IT"),
      "password",
      0
    )
  );
  const record = await recordClient
    .fromFile(file)
    .withSigner(new Signer(certificate))
    .build();
  const details = await recordClient.fromFile(record.retrieve()).getDetails();
  console.log(JSON.stringify(details));
}

main()
  .then(console.log)
  .catch(console.error);
