export const trimAndStripHTMLTags = html =>
  html.replace(/<\/?[^>]+>/gi, "").trim()
