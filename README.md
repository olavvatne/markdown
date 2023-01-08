# Markdown
Markdown renderer using Rust's [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark), packaged with WASI to WebAssembly.


## Getting Started
Requires Node and Rust on your system.

```bash
cargo install cargo-wasi
cargo install wasm-tools@1.0.16
cargo wasi --version
cargo install --git https://github.com/bytecodealliance/wit-bindgen --rev d24b97f wit-bindgen-cli
```
```bash
cargo wasi build --release
wasm-tools component new target/wasm32-wasi/release/markdown.wasi.wasm -o component.wasm --adapt poly/wasi_snapshot_preview1.wasm

wit-bindgen host js component.wasm --name markdown --map wasi-exit=./imports/wasi-exit.js,wasi-logging=./imports/wasi-logging.js,wasi-filesystem=./imports/wasi-filesystem.js,wasi-poll=./imports/wasi-poll.js,wasi-random=./imports/wasi-random.js --no-nodejs-compat --tla-compat
```

