wit_bindgen_guest_rust::generate!("world.wit");
use pulldown_cmark::{html, Parser, Options};

use markdown::*;

struct Component;

export_markdown!(Component);

impl Markdown for Component {
    fn render(input: String) -> String {
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        options.insert(Options::ENABLE_TABLES);
        options.insert(Options::ENABLE_TASKLISTS);

        let parser = Parser::new_ext(&input, options);
        let mut html_output = String::new();
        html::push_html(&mut html_output, parser);
        html_output
    }
}