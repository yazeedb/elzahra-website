import React from "react"
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemIcon,
  Typography,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import GroupIcon from "@material-ui/icons/Group"
import AppsIcon from "@material-ui/icons/Apps"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ContactSupportIcon from "@material-ui/icons/ContactSupport"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => {
  const linkStyles = {
    textDecoration: "none",
    display: "block",
  }

  return {
    listItem: {
      width: "200px",
    },
    link: {
      ...linkStyles,
      color: theme.palette.textSecondary,
    },
    activeLink: {
      ...linkStyles,
      backgroundColor: `rgba(${theme.palette.primary.mainRgb}, 0.4)`,
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
  }
})

const SideNav = props => {
  const classes = useStyles()

  return (
    <SwipeableDrawer {...props}>
      <List className={classes.list}>
        {[
          { text: "Home", href: "/", icon: <HomeIcon /> },
          { text: "About Us", href: "/about", icon: <GroupIcon /> },
          {
            text: "Programs & Services",
            href: "/programs-services",
            icon: <AppsIcon />,
          },
          { text: "Donate", href: "/donate", icon: <FavoriteIcon /> },
          {
            text: "Contact Us",
            href: "/contact",
            icon: <ContactSupportIcon />,
          },
        ].map(item => {
          return (
            <Link
              to={item.href}
              key={item.text}
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    style: { fontWeight: "bold" },
                  }}
                />
              </ListItem>
            </Link>
          )
        })}
      </List>
    </SwipeableDrawer>
  )
}

export default SideNav
