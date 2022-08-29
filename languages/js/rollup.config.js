import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import { wasm } from "@rollup/plugin-wasm";
import copy from "rollup-plugin-copy";

const config = [
  {
    input: [
      "src/index.ts",
    ],
    inlineDynamicImports: true,
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/index.mjs`,
        format: "es",
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
  {
    input: "dist/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];

export default config;
