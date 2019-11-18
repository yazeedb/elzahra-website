import React from "react"
import {
  AppBar,
  IconButton,
  Typography,
  makeStyles,
  Toolbar,
  Button,
  useScrollTrigger,
  Slide,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import HeartIcon from "@material-ui/icons/FavoriteBorder"

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

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title} noWrap>
              {siteTitle}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              className={classes.donateButton}
              startIcon={<HeartIcon />}
            >
              Donate
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  )
}

export default Header
