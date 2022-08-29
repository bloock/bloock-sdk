import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import { wasm } from "@rollup/plugin-wasm";
import copy from "rollup-plugin-copy";

const config = [
  {
    input: [
      "test/index.test.ts",
    ],
    inlineDynamicImports: true,
    output: [
      {
        file: "dist/bloock-sdk.test.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: ["@grpc/grpc-js", "protobufjs"],
    plugins: [
      resolve(),
      commonjs(),
      wasm(),
      copy({
        targets: [{ src: "src/ffi/native/bloock_bridge_bg.wasm", dest: "dist" }],
      }),
      typescript()
    ],
  },
];

export default config;
