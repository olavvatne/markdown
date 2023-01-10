# Markdown
Markdown renderer using Rust's [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark), packaged with wasm-pack to WebAssembly.


## Getting Started
* Requires [Node](https://nodejs.org/en/) and [Rust](https://www.rust-lang.org/) on your system.
* Install [wasm-pack](https://rustwasm.github.io/docs/wasm-pack/quickstart.html)
```
wasm-pack build --target web --out-dir pkg
```