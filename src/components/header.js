import PropTypes from "prop-types"
import React, { useContext } from "react"
import { Nav } from "jdb-components"
import { ThemeContext } from "styled-components"

const Header = ({ setDarkMode, siteTitle }) => {
  const menuText = {
    openText: siteTitle,
    closeText: siteTitle,
  }
  const theme = useContext(ThemeContext)
  const { darkMode } = theme.mode
  const colors = {
    headerColor: "successSecondary",
    menuColor: "secondaryPrimary",
    handleColor: darkMode
      ? theme.colors.dark.light
      : theme.colors.light.regular,
    iconColor: darkMode
      ? theme.colors.success.light
      : theme.colors.success.dark,
    trackColor: theme.colors.border.light,
  }
  return (
    <Nav
      colors={colors}
      height="3.5rem"
      isGatsby
      links={[
        { name: "My Portfolio", path: "https://johnblackwell.dev" },
        {
          name: "Github Repo",
          path: "https://github.com/jayblack388/gradient-generator",
        },
      ]}
      menuText={menuText}
      setDarkMode={setDarkMode}
      width="40%"
    />
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
