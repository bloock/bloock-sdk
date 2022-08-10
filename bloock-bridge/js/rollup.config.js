import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";
import { wasm } from "@rollup/plugin-wasm";

const config = [
  {
    input: "build/index.js",
    output: [
      {
        file: "dist/bloock-sdk.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/bloock-sdk.mjs`,
        format: "es",
        sourcemap: true,
      },
    ],
    external: ["@grpc/grpc-js", "protobufjs"],
    plugins: [
      resolve(),
      commonjs(),
      wasm(),
      typescript(),
      copy({
        targets: [{ src: "src/ffi/native/bloock_bridge.wasm", dest: "dist" }],
      }),
    ],
  },
  {
    input: "build/index.d.ts",
    output: {
      file: "dist/bloock-sdk.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];

export default config;
