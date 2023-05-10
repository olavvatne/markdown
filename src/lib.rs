use once_cell::sync::Lazy;
use pulldown_cmark::{html, CodeBlockKind, CowStr, Event, Options, Parser, Tag};
use syntect::html::{start_highlighted_html_snippet, append_highlighted_html_for_styled_line, IncludeBackground};
use std::sync::Mutex;
use syntect::easy::HighlightLines;
use syntect::parsing::SyntaxSet;
use syntect::highlighting::{ThemeSet};
use syntect::util::{LinesWithEndings};
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

    let parser = CustomParser(Parser::new_ext(&input, options));
    let mut html_output = String::with_capacity(input.len());
    html::push_html(&mut html_output, parser);
    html_output
}

static SYNTAX_SET: Lazy<Mutex<Option<SyntaxSet>>> = Lazy::new(|| Mutex::new(None));
static THEME_SET: Lazy<Mutex<Option<ThemeSet>>> = Lazy::new(|| Mutex::new(None));

// Unsafe here at the momoent
#[wasm_bindgen(js_name = loadSyntax)]
pub unsafe fn load_syntax(syntax: String) {
    let mut syntax_state = SYNTAX_SET.lock().unwrap();
    // *syntax_state = Some(SyntaxSet::load_defaults_newlines());
}

#[wasm_bindgen(js_name = loadTheme)]
pub unsafe fn load_theme(theme: String) {
    let mut theme_state = THEME_SET.lock().unwrap();
    // *theme_state = Some(ThemeSet::load_defaults());
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

impl<'e> CustomParser<'e> {
    fn parse_code_block<'a>(&'a mut self) -> Option<Event<'e>> {
        let mut to_highlight = String::new();

        while let Some(event) = &self.0.next() {
            match event {
                Event::Text(t) => {
                    to_highlight.push_str(t);
                    // to_highlight.push('\n')
                }
                Event::End(Tag::CodeBlock(token)) => {
                    let theme = THEME_SET.lock().unwrap();
                    let syntax = SYNTAX_SET.lock().unwrap();
                    match &*syntax {
                        Some(set) => {
                            let syntax = if let CodeBlockKind::Fenced(val) = token {
                                set.find_syntax_by_extension(val)
                                    .unwrap_or_else(|| set.find_syntax_plain_text())
                            } else {
                                set.find_syntax_plain_text()
                            };

                            let theme = &theme.as_ref().unwrap().themes["base16-eighties.dark"];
                            let mut highlighter = HighlightLines::new(syntax, theme);
                            let (mut output, bg) = start_highlighted_html_snippet(theme);
                        
                            for line in LinesWithEndings::from(&to_highlight) {
                                let regions = highlighter.highlight_line(line, &set).unwrap();
                                append_highlighted_html_for_styled_line(
                                    &regions[..],
                                    IncludeBackground::IfDifferent(bg),
                                    &mut output,
                                ).unwrap();
                            }
                            output.push_str("</pre>\n");
                            // let html =
                            //     highlighted_html_for_string(&to_highlight, set, &syntax, theme)
                            //         .unwrap();
                            // return Some(Event::Html(CowStr::Boxed(html.into_boxed_str())));
                            return Some(Event::Html(CowStr::Boxed(output.into_boxed_str())));

                            // return Some(Event::Html(CowStr::Boxed(to_highlight.into_boxed_str())));
                        }
                        None => {
                            let mut raw_pre_html = String::new();
                            raw_pre_html.push_str("<pre>");
                            raw_pre_html.push_str(to_highlight.as_str());
                            raw_pre_html.push_str("</pre>");
                            return Some(Event::Html(CowStr::Boxed(raw_pre_html.into_boxed_str())));
                        }
                    }
                }
                _ => {}
            }
        }

        None
    }
}
