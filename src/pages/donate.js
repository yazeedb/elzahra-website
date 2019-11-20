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
import { amazonColor, borderRadius, alternateSectionBackground } from "../theme"
import { getActionButtonStyles, getTitleStyles } from "."

const useStyles = makeStyles(theme => {
  return {
    donateTitle: getTitleStyles(theme),
    causeTitles: {
      ...getTitleStyles(theme),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
    },
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
      ...getTitleStyles(theme),
      textAlign: "initial",
    },
    oddCause: {
      backgroundColor: alternateSectionBackground,
    },
  }
})

const DonatePage = () => {
  const donationCausePosts = useStaticQuery(graphql`
    query DonationCausePosts {
      allWordpressPost(
        filter: {
          categories: { elemMatch: { name: { eq: "Donation Causes" } } }
        }
        sort: { fields: date, order: DESC }
      ) {
        edges {
          node {
            id
            title
            content
            featured_media {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

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

      {donationCausePosts.allWordpressPost.edges.map(({ node }, index) => {
        return (
          <div key={node.id}>
            <Typography
              variant="h4"
              className={classes.causeTitles}
              dangerouslySetInnerHTML={{ __html: node.title }}
            />

            {node.featured_media && (
              <img
                src={node.featured_media.localFile.childImageSharp.fluid.src}
                className={classes.causeImage}
              />
            )}

            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: node.content }}
            />

            <Button
              className={classes.donateButton}
              color="secondary"
              variant="contained"
              fullWidth={true}
            >
              Donate now
            </Button>
          </div>
        )
      })}

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
