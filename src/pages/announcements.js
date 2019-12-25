import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardActions,
  Button,
  Grid,
  CardMedia,
} from "@material-ui/core"
import { format } from "date-fns"
import { primaryMain } from "../theme"
import Post from "../components/post"

export const getTitleStyles = theme => ({
  fontWeight: "bold",
  textAlign: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
})

export const getActionButtonStyles = theme => ({
  height: "50px",
  marginTop: theme.spacing(2),
})

const getPaperStyles = theme => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  maxHeight: "64px",
  minWidth: "180px",
})

const useStyles = makeStyles(theme => {
  return {
    card: {
      margin: `${theme.spacing()}px 0`,
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    announcementsTitle: getTitleStyles(theme),
    actionButton: getActionButtonStyles(theme),
    cardMedia: {
      height: "145px",
    },
    servicesTitle: {
      ...getTitleStyles(theme),
      marginTop: theme.spacing(8),
    },
    servicePaper: {
      ...getPaperStyles(theme),

      // RACE CONDITION BAND-AID!
      // For some reason index.js isn't receiving ThemeProvider
      // So theme.palette.primary.main isn't working
      color: primaryMain,
      border: `2px solid ${primaryMain}`,
    },
    viewAllServicesButton: getPaperStyles(theme),
    supportUsTitle: {
      ...getTitleStyles(theme),
      marginTop: theme.spacing(8),
    },
  }
})

const AnnouncementsPage = () => {
  const content = useStaticQuery(graphql`
    query AllAnnouncementsQuery {
      announcements: allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Announcements" } } } }
        sort: { fields: date, order: DESC }
      ) {
        edges {
          node {
            excerpt
            date
            id
            path
            title
            categories {
              id
              name
            }
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

  const { announcements } = content

  const classes = useStyles()

  return (
    <Layout>
      <SEO title="All announcements" />

      <Typography variant="h4" className={classes.announcementsTitle}>
        All Announcements
      </Typography>

      <Grid container spacing={3}>
        <Post announcements={announcements.edges} />
      </Grid>
    </Layout>
  )
}

export default AnnouncementsPage
