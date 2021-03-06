import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography, makeStyles, Button, Paper, Grid } from "@material-ui/core"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import SalahTimes from "../components/salahTimes"
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
    announcementsTitle: getTitleStyles(theme),
    actionButton: getActionButtonStyles(theme),
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

const IndexPage = () => {
  const content = useStaticQuery(graphql`
    query ContentQuery {
      announcements: allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Announcements" } } } }
        limit: 4
        sort: { fields: date, order: DESC }
      ) {
        ...AllAnnouncementsFragment
      }

      supportUsContent: wordpressPost(
        categories: { elemMatch: { name: { eq: "Support Us Message" } } }
      ) {
        content
        title
      }

      servicesContent: allWordpressPost(
        limit: 5
        filter: {
          categories: { elemMatch: { name: { eq: "Programs and Services" } } }
        }
      ) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)

  const { announcements, supportUsContent, servicesContent } = content

  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home" />

      <Typography variant="h4" className={classes.announcementsTitle}>
        Announcements
      </Typography>

      <Grid container spacing={3}>
        <Post announcements={announcements.edges} />
      </Grid>

      <Link
        to="announcements"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          fullWidth={true}
          variant="contained"
          color="secondary"
          className={classes.actionButton}
        >
          View all announcements
        </Button>
      </Link>

      <SalahTimes />

      <Typography variant="h4" className={classes.servicesTitle}>
        Programs and Services
      </Typography>

      <Grid container spacing={3}>
        {servicesContent.edges.map(({ node }) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={node.id}>
              <Paper className={classes.servicePaper} elevation={0}>
                <Typography
                  variant="h6"
                  dangerouslySetInnerHTML={{ __html: node.title }}
                  noWrap
                />
              </Paper>
            </Grid>
          )
        })}
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/programs-services">
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIosIcon />}
              className={classes.viewAllServicesButton}
              size="large"
              fullWidth={true}
            >
              View all
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Typography variant="h4" className={classes.supportUsTitle}>
        {supportUsContent.title}
      </Typography>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: supportUsContent.content,
        }}
        color="textSecondary"
      />

      <Link
        to="/donate"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          fullWidth={true}
          variant="contained"
          color="secondary"
          className={classes.actionButton}
        >
          Donate Now
        </Button>
      </Link>
    </Layout>
  )
}

export default IndexPage
