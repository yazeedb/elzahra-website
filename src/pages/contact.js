import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography, makeStyles, Button, Grid } from "@material-ui/core"
import EmailIcon from "@material-ui/icons/Email"
import PhoneIcon from "@material-ui/icons/Phone"
import PlaceIcon from "@material-ui/icons/Place"
import elzahraGoogleMaps from "../images/elzahra-google-maps.png"
import {
  amazonColor,
  borderRadius,
  getBodyCopyStyles,
  textSecondary,
} from "../theme"
import { getActionButtonStyles, getTitleStyles } from "."

const useStyles = makeStyles(theme => {
  const causeTitles = {
    ...getTitleStyles(theme),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(2),
  }

  return {
    causeTitles,
    bodyCopy: getBodyCopyStyles(theme),
    causeImage: {
      width: "100%",
    },
    amazonSmileLogo: {
      width: "100%",
      border: `2px solid ${amazonColor}`,
      borderRadius: borderRadius,
    },
    amazonButton: {
      ...getActionButtonStyles(theme),
      background: amazonColor,
      color: "white",
    },
    donateButton: getActionButtonStyles(theme),
    checkOrPledgeTitle: {
      ...causeTitles,
      paddingBottom: theme.spacing(0),
    },

    titleText: {
      fontWeight: "bold",
      marginLeft: "10px",
    },

    section: {
      marginTop: theme.spacing(8),
    },

    subsection: {
      color: textSecondary,
      marginTop: theme.spacing(1),
    },

    googleMaps: {
      width: "100%",
      marginTop: theme.spacing(2),
    },
  }
})

const ContactUs = () => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Contact Us" />

      <Grid container className={classes.section}>
        <Grid item>
          <EmailIcon color="secondary" fontSize="large" />
        </Grid>

        <Grid item>
          <Typography variant="h4" className={classes.titleText}>
            Email
          </Typography>
        </Grid>

        <Grid container>
          <Grid container>
            <Typography variant="body1" className={classes.subsection}>
              Office -{" "}
              <a href="mailto:office@elzahra.org">office@elzahra.org</a>
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant="body1" className={classes.subsection}>
              Imam - <a href="mailto:imam@elzahra.org">imam@elzahra.org</a>
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant="body1" className={classes.subsection}>
              Info - <a href="mailto:info@elzahra.org">info@elzahra.org</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.section}>
        <Grid item>
          <PhoneIcon color="secondary" fontSize="large" />
        </Grid>

        <Grid item>
          <Typography variant="h4" className={classes.titleText}>
            Phone
          </Typography>
        </Grid>

        <Grid container>
          <Grid container>
            <Typography variant="body1" className={classes.subsection}>
              Main - <a href="tel:201-670-9090">201-670-9090</a>
            </Typography>
          </Grid>

          <Grid container>
            <Typography variant="body1" className={classes.subsection}>
              Hall facility usage - <a href="tel:357-987-6147">357-987-6147</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.section}>
        <Grid item>
          <PlaceIcon color="secondary" fontSize="large" />
        </Grid>

        <Grid item>
          <Typography variant="h4" className={classes.titleText}>
            Address
          </Typography>
        </Grid>

        <Grid item>
          <a
            href="https://www.google.com/maps/place/El-Zahra+Islamic+Center+of+Midland+Park/@41.0012164,-74.1457903,17z/data=!3m1!4b1!4m5!3m4!1s0x89c2e36c5bbcc62b:0x38b2f1e168f5dce8!8m2!3d41.0012164!4d-74.1436016"
            target="_blank"
          >
            <Typography variant="body1">
              218 Irving Street, Midland Park, NJ 07432
            </Typography>

            <img src={elzahraGoogleMaps} className={classes.googleMaps} />
          </a>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactUs
