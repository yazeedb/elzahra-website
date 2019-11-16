import React from "react"
import {
  AppBar,
  IconButton,
  Typography,
  makeStyles,
  Toolbar,
  Button,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import HeartIcon from "@material-ui/icons/FavoriteBorder"

const useStyles = makeStyles(theme => {
  console.log("the theme:", theme)
  return {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: "bold",
    },
    donateButton: {
      fontWeight: "bold",
      minWidth: "105px",
    },
  }
})

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
    </div>
  )
}

export default Header
