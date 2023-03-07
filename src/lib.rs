use once_cell::sync::Lazy;
use pulldown_cmark::{html, CodeBlockKind, CowStr, Event, Options, Parser, Tag};
use syntect::{highlighting::ThemeSet, html::highlighted_html_for_string, parsing::SyntaxSet};
use wasm_bindgen::prelude::*;

mod utils;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn render(input: String) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_TASKLISTS);

    let parser = Parser::new_ext(&input, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    html_output
}

struct CustomParser<'e>(Parser<'e, 'e>);

impl<'e> Iterator for CustomParser<'e> {
    type Item = Event<'e>;

    fn next(&mut self) -> Option<Self::Item> {
        let Some(next) = self.0.next() else {
            return None;
        };

        if let Event::Start(Tag::CodeBlock(_)) = next {
            return self.parse_code_block();
        }

        Some(next)
    }
}

static SYNTAX_SET: Lazy<SyntaxSet> = Lazy::new(|| SyntaxSet::load_defaults_newlines());
static THEME_SET: Lazy<ThemeSet> = Lazy::new(|| ThemeSet::load_defaults());

impl<'e> CustomParser<'e> {
    fn parse_code_block<'a>(&'a mut self) -> Option<Event<'e>> {
        let mut to_highlight = String::new();

        while let Some(event) = &self.0.next() {
            match event {
                Event::Text(t) => {
                    to_highlight.push_str(t);
                }
                Event::End(Tag::CodeBlock(token)) => {
                    let ss = &SYNTAX_SET;
                    let syntax = if let CodeBlockKind::Fenced(val) = token {
                        ss.find_syntax_by_extension(val)
                            .unwrap_or_else(|| ss.find_syntax_plain_text())
                    } else {
                        ss.find_syntax_plain_text()
                    };

                    let theme = &THEME_SET.themes["base16-eighties.dark"];
                    let html =
                        highlighted_html_for_string(&to_highlight, ss, &syntax, theme).unwrap();

                    return Some(Event::Html(CowStr::Boxed(html.into_boxed_str())));
                }
                _ => {}
            }
        }

        None
    }
}
