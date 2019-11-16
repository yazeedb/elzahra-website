import { createMuiTheme } from "@material-ui/core/styles"

export const appTheme = createMuiTheme({
  palette: {
    primary: { main: "#251C77" },
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
})
