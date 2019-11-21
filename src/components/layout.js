/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components"
import { ColDiv, GlobalStyles, Page, Theme, useDarkMode } from "jdb-components"

import Header from "./header"

const Layout = ({ children }) => {
  const [_, setValue] = useState(false)
  const [darkMode, setDarkMode] = useDarkMode(setValue)

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
    <ThemeProvider theme={Theme({ darkMode })}>
      <GlobalStyles />
      <Page>
        <Header
          setDarkMode={setDarkMode}
          siteTitle={data.site.siteMetadata.title}
        />
        <ColDiv height="calc(100% - 3.5rem);" align="center">
          {children}
          <footer style={{ marginTop: "auto" }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </ColDiv>
      </Page>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
