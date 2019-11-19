import { createMuiTheme } from "@material-ui/core/styles"

export const primaryMain = "#251C77"
export const primaryMainRgb = "37,28,119"

export const appTheme = createMuiTheme({
  palette: {
    primary: { main: primaryMain, mainRgb: primaryMainRgb },
    secondary: { main: "#F31A76" },
    textPrimary: "#000",
    textSecondary: "#4F4F4F",
    link: "#2D9CDB",
    amazonColor: "#FB9838",
    white: "#fff",
  },
  breakpoints: {
    customValues: {
      reallySmall: 370,
    },
  },
  borderRadius: 3,
})
