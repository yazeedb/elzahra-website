import { createMuiTheme } from "@material-ui/core/styles"

export const primaryMain = "#251C77"
export const primaryMainRgb = "37,28,119"
export const secondaryMain = "#F31A76"
export const textSecondary = "#4F4F4F"
export const amazonColor = "#FB9838"
export const borderRadius = 3
export const alternateSectionBackground = `rgba(${primaryMainRgb}, 0.05)`

export const appTheme = createMuiTheme({
  palette: {
    primary: { main: primaryMain, mainRgb: primaryMainRgb },
    secondary: { main: secondaryMain },
    textPrimary: "#000",
    textSecondary,
    link: "#2D9CDB",
    amazonColor,
    alternateSectionBackground,
    white: "#fff",
    background: {
      default: "white",
    },
  },
  breakpoints: {
    customValues: {
      reallySmall: 370,
    },
  },
  borderRadius,
  typography: {
    fontSize: 16,
  },
})

export const getBodyCopyStyles = () => ({
  fontSize: "1.2rem",
  color: textSecondary,
})

export const maxAppBarHeight = 56

export const baseLayoutStyles = {
  margin: "0 auto",
  padding: "0px 1.0875rem 1.45rem",
  paddingTop: 0,
  marginTop: maxAppBarHeight + appTheme.spacing(4),
}
