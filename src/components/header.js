import React, { useState } from "react"
import {
  AppBar,
  IconButton,
  Typography,
  makeStyles,
  Toolbar,
  Button,
  useScrollTrigger,
  Slide,
  useMediaQuery,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import HeartIcon from "@material-ui/icons/FavoriteBorder"
import SideNav from "./SideNav"
import { Link } from "gatsby"

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export const maxAppBarHeight = 56

const useStyles = makeStyles(theme => {
  return {
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: "bold",
    },
    donateButton: {
      minWidth: "105px",
    },
    appBar: {
      maxHeight: maxAppBarHeight,
    },
  }
})

const Header = ({ siteTitle, shortSiteTitle }) => {
  const [sideNavVisible, setSideNavVisible] = useState(false)
  const classes = useStyles()
  const isMobileViewport = useMediaQuery("(max-width: 480px)")

  return (
    <div className={classes.root}>
      <SideNav
        open={sideNavVisible}
        onClose={() => {
          setSideNavVisible(false)
        }}
        onOpen={console.log}
      />
      <HideOnScroll>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setSideNavVisible(true)
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title} noWrap>
              {isMobileViewport ? shortSiteTitle : siteTitle}
            </Typography>

            <Link
              to="/donate"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.donateButton}
                startIcon={<HeartIcon />}
              >
                Donate
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  )
}

export default Header
