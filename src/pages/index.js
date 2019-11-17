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
} from "@material-ui/core"
import { format } from "date-fns"
import SalahTimes from "../components/salahTimes"

export const getTitleStyles = theme => ({
  fontWeight: "bold",
  textAlign: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
})

const useStyles = makeStyles(theme => {
  return {
    card: {
      borderTop: `4px solid ${theme.palette.secondary.main}`,
      margin: `${theme.spacing(2)}px 0`,
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
    supportUsTitle: {
      ...getTitleStyles(theme),
      marginTop: theme.spacing(8),
    },
  }
})

const IndexPage = () => {
  const content = useStaticQuery(graphql`
    query AnnouncementsQuery {
      announcements: allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Announcements" } } } }
        limit: 2
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
    }
  `)

  const { announcements, supportUsContent } = content

  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home" />
      <Typography variant="h4" className={classes.announcementsTitle}>
        Announcements
      </Typography>

      {announcements.edges.map(({ node }) => {
        return (
          <Card className={classes.card} key={node.id}>
            <CardContent className={classes.cardContent}>
              <div className={classes.cardHeader}>
                <Typography variant="h6">
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
              <Button variant="contained" color="secondary">
                Read more
              </Button>
            </CardActions>
          </Card>
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

      <SalahTimes />

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
