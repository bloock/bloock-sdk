const path = require('path');
const { execSync } = require('child_process');
const rimraf = require('rimraf');

const PROTO_DIR = path.join(__dirname, '../../../bloock-bridge/proto');
const MODEL_DIR = path.join(__dirname, '../src/bridge/proto');
const PROTOC_PATH = path.join(
  __dirname,
  '../node_modules/grpc-tools/bin/protoc'
);
const PLUGIN_PATH = path.join(
  __dirname,
  '../node_modules/.bin/protoc-gen-ts_proto'
);

rimraf.sync(`${MODEL_DIR}/*`, {
  glob: { ignore: `${MODEL_DIR}/tsconfig.json` },
});

const protoConfig = [
  `--plugin=${PLUGIN_PATH}`,

  '--ts_proto_opt=outputServices=generic-definitions,snakeToCamel=true,outputServices=default,useOptionals=messages,exportCommonSymbols=false,esModuleInterop=true',

  `--ts_proto_out=${MODEL_DIR}`,
  `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`,
];

execSync(`${PROTOC_PATH} ${protoConfig.join(' ')}`);
console.log(`> Proto models created: ${MODEL_DIR}`);
