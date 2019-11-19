import React from "react"
import { makeStyles } from "@material-ui/core"
import ElzahraLogo from "../images/elzahra-logo.jpg"
import { useStaticQuery, graphql } from "gatsby"
import { trimAndStripHTMLTags } from "../utils"

const useStyles = makeStyles(theme => {
  const linkStyles = {
    color: "white",
  }

  return {
    footer: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(4),
      marginTop: theme.spacing(4),
      textAlign: "center",
      color: "white",
    },
    logo: {
      maxWidth: "200px",
      borderRadius: theme.borderRadius,
      marginBottom: theme.spacing(2),
    },
    contactLinks: {
      ...linkStyles,
      fontWeight: "bold",
      margin: "0 10px",
    },
    yazeedLink: linkStyles,
  }
})

const Footer = () => {
  const classes = useStyles()

  const contactInfo = useStaticQuery(graphql`
    query ContactInfoQuery {
      phoneNumber: wordpressPost(title: { eq: "Main Office Phone" }) {
        id
        content
      }

      email: wordpressPost(title: { eq: "Main Office Email" }) {
        id
        content
      }
    }
  `)

  const phoneNumber = trimAndStripHTMLTags(contactInfo.phoneNumber.content)
  const email = trimAndStripHTMLTags(contactInfo.email.content)

  return (
    <div className={classes.footer}>
      <img
        className={classes.logo}
        src={ElzahraLogo}
        alt="El-Zahra Islamic Center Logo"
      />

      <div>
        <a className={classes.contactLinks} href={`tel:${phoneNumber}`}>
          {phoneNumber}
        </a>
        <a className={classes.contactLinks} href={`mailto:${email}`}>
          {email}
        </a>
      </div>

      <div>
        <a className={classes.yazeedLink} href="https://yazeedb.com">
          Designed by Yazeed Bzadough
        </a>
      </div>
    </div>
  )
}

export default Footer
