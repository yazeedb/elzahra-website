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

import Header, { maxAppBarHeight } from "./header"
import { ThemeProvider } from "@material-ui/styles"
import { appTheme } from "../theme"
import Footer from "./footer"

const Layout = ({ children, childrenOutsideWrapper }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{
        marginTop: maxAppBarHeight,
      }}
    >
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header siteTitle={data.site.siteMetadata.title} />
        {childrenOutsideWrapper}
        <div
          style={{
            margin: `0 auto`,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
        </div>

        <Footer />
      </ThemeProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
