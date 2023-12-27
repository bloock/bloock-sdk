const copy = require("rollup-plugin-copy");

module.exports = {
  rollup(config, opts) {
    opts.name = "index";

    config.external = [
      "fs",
      "path",
      "protobufjs/minimal",
      "long",
      "node-fetch"
    ];
    if (config.output.format === "umd") {
      delete config.external;
    }

    config.plugins = [
      ...config.plugins,
      copy({
        targets: [{ src: "src/ffi/native/bloock_bridge_bg.wasm", dest: "dist" }]
      })
    ];
    return config;
  }
};
