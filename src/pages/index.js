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
} from "@material-ui/core"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import { format } from "date-fns"
import SalahTimes from "../components/salahTimes"
import { primaryMain } from "../theme"

export const getTitleStyles = theme => ({
  fontWeight: "bold",
  textAlign: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
})

const getPaperStyles = theme => ({
  padding: theme.spacing(2),
  textAlign: "center",
  maxHeight: "64px",
  minWidth: "180px",
})

const useStyles = makeStyles(theme => {
  return {
    card: {
      borderTop: `4px solid ${theme.palette.secondary.main}`,
      margin: `${theme.spacing()}px 0`,
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: theme.spacing(),
    },
    announcementsTitle: getTitleStyles(theme),
    announcementsActions: {
      justifyContent: "flex-end",
      paddingTop: 0,
      paddingBottom: theme.spacing(2),
    },
    actionButton: {
      height: "50px",
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
      backgroundColor: primaryMain,

      color: "white",
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
        limit: 3
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
          }
        }
      }

      supportUsContent: allWordpressPost(
        limit: 1
        filter: {
          categories: { elemMatch: { name: { eq: "Support Us Message" } } }
        }
      ) {
        edges {
          node {
            content
            title
          }
        }
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
        {announcements.edges.map(({ node }) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={node.id}>
              <Card className={classes.card} key={node.id}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.cardHeader}>
                    <Typography
                      variant="h6"
                      style={{
                        marginRight: "5px",
                      }}
                    >
                      <b>{node.title}</b>
                    </Typography>

                    <Typography variant="subtitle1" color="textSecondary">
                      {format(new Date(node.date), "M/d/yyyy")}
                    </Typography>
                  </div>

                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                    color="textSecondary"
                  />
                </CardContent>
                <CardActions className={classes.announcementsActions}>
                  <Button variant="text" color="secondary">
                    Read more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}

        <Button
          fullWidth={true}
          variant="contained"
          color="secondary"
          className={classes.actionButton}
        >
          View all announcements
        </Button>
      </Grid>

      <SalahTimes />

      <Typography variant="h4" className={classes.servicesTitle}>
        Programs and Services
      </Typography>

      <Grid container spacing={3}>
        {servicesContent.edges.map(({ node }) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={node.id}>
              <Paper className={classes.servicePaper}>
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
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            className={classes.viewAllServicesButton}
            size="large"
            fullWidth={true}
          >
            View all
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" className={classes.supportUsTitle}>
        {supportUsContent.edges[0].node.title}
      </Typography>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: supportUsContent.edges[0].node.content,
        }}
        color="textSecondary"
      />

      <Button
        fullWidth={true}
        variant="contained"
        color="secondary"
        className={classes.actionButton}
      >
        Donate Now
      </Button>
    </Layout>
  )
}

export default IndexPage
