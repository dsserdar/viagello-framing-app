// A smart dictionary containing the direct, physical files for every font variation!
export const FONT_LIBRARY: Record<string, { base: string, bold: string, italic: string, boldItalic: string }> = {
  "Roboto (Clean Sans)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-700-italic.woff",
  },
  "Playfair Display (Elegant Serif)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-700-italic.woff",
  },
  "Lato (Modern Sans)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-700-italic.woff",
  },
  "Merriweather (Classic Serif)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/merriweather/files/merriweather-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/merriweather/files/merriweather-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/merriweather/files/merriweather-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/merriweather/files/merriweather-latin-700-italic.woff",
  },
  "Montserrat (Geometric)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/montserrat/files/montserrat-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/montserrat/files/montserrat-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/montserrat/files/montserrat-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/montserrat/files/montserrat-latin-700-italic.woff",
  },
  "Open Sans (Neutral)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/open-sans/files/open-sans-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/open-sans/files/open-sans-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/open-sans/files/open-sans-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/open-sans/files/open-sans-latin-700-italic.woff",
  },
  "Lora (Artistic Serif)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-400-italic.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-700-italic.woff",
  },
  // ARTISTIC & SCRIPT FONTS (These rarely have real bold/italic versions, so we safely fallback to the base file)
  "Great Vibes (Brush Script)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff",
  },
  "Pacifico (Marker Script)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/pacifico/files/pacifico-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/pacifico/files/pacifico-latin-400-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/pacifico/files/pacifico-latin-400-normal.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/pacifico/files/pacifico-latin-400-normal.woff",
  },
  "Dancing Script (Handwriting)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/dancing-script/files/dancing-script-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/dancing-script/files/dancing-script-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/dancing-script/files/dancing-script-latin-400-normal.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/dancing-script/files/dancing-script-latin-700-normal.woff",
  },
  "Cinzel (Roman Serif)": {
    base: "https://cdn.jsdelivr.net/npm/@fontsource/cinzel/files/cinzel-latin-400-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/cinzel/files/cinzel-latin-700-normal.woff",
    italic: "https://cdn.jsdelivr.net/npm/@fontsource/cinzel/files/cinzel-latin-400-normal.woff",
    boldItalic: "https://cdn.jsdelivr.net/npm/@fontsource/cinzel/files/cinzel-latin-700-normal.woff",
  }
};

export const FONT_NAMES = Object.keys(FONT_LIBRARY);