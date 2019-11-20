import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardActions,
  Button,
  Paper,
  Grid,
  CardMedia,
} from "@material-ui/core"
import amazonSmileLogo from "../images/amazon-smile-logo.png"
import { amazonColor, borderRadius } from "../theme"
import { getActionButtonStyles, getTitleStyles } from "."

const useStyles = makeStyles(theme => {
  return {
    donateTitle: getTitleStyles(theme),
    amazonSmileLogo: {
      width: "100%",
      border: `2px solid ${amazonColor}`,
      borderRadius: borderRadius,
      // minHeight: "150px",
    },
    amazonButton: {
      ...getActionButtonStyles(theme),
      background: amazonColor,
      color: "white",
    },
    checkOrPledgeTitle: {
      ...getTitleStyles(theme),
      textAlign: "initial",
    },
  }
})

const DonatePage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Donate" />

      <Typography variant="h4" className={classes.donateTitle}>
        Donate
      </Typography>

      <img src={amazonSmileLogo} className={classes.amazonSmileLogo} />

      <Typography variant="body1">
        When you shop at <b>smile.amazon.com</b>, Amazon sends a donation to us.
      </Typography>

      <Button
        fullWidth={true}
        variant="contained"
        className={classes.amazonButton}
        href="http://smile.amazon.com/"
        target="_blank"
      >
        Go to Amazon
      </Button>

      <Typography variant="h4" className={classes.checkOrPledgeTitle}>
        Send a Check
      </Typography>
      <Typography variant="body1">
        El-Zahra Education Foundation Inc.
        <br />
        218 Irving Street
        <br />
        Midland Park, NJ 07432
      </Typography>

      <Typography variant="h4" className={classes.checkOrPledgeTitle}>
        Make a Pledge
      </Typography>
      <Typography variant="body1">
        Please fill out and mail the <a href="#">pledge form</a>
      </Typography>
    </Layout>
  )
}

export default DonatePage
