/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline"

import Header from "./header"
import { ThemeProvider } from "@material-ui/styles"
import { appTheme, baseLayoutStyles } from "../theme"
import Footer from "./footer"

const Layout = ({ children, wrapperStyles = {} }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          shortTitle
        }
      }
    }
  `)

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header
          siteTitle={data.site.siteMetadata.title}
          shortSiteTitle={data.site.siteMetadata.shortTitle}
        />

        <div
          style={{
            ...baseLayoutStyles,
            ...wrapperStyles,
          }}
        >
          <main>{children}</main>
        </div>

        <Footer />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
