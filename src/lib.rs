use pulldown_cmark::{html, Options, Parser};
use wasm_bindgen::prelude::*;

mod utils;

#[cfg(feature = "highlighting")]
mod highlighting;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
//https://github.com/Menci/syntect-js/blob/main/src/lib.rs

#[wasm_bindgen]
pub fn render(input: String) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_TASKLISTS);

    #[cfg(feature = "highlighting")]
    let parser = highlighting::CustomParser(Parser::new_ext(&input, options));
    #[cfg(not(feature = "highlighting"))]
    let parser = Parser::new_ext(&input, options);
    let mut html_output = String::with_capacity(input.len());
    html::push_html(&mut html_output, parser);
    html_output
}

