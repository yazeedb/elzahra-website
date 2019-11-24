import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
import { textSecondary, primaryMain } from "../theme"
import { getTitleStyles } from "."

const useStyles = makeStyles(theme => {
  return {
    mainTitle: getTitleStyles(theme),
    serviceTitle: {},
    serviceSection: {
      marginTop: theme.spacing(8),
      borderTop: `4px solid ${primaryMain}`,
    },
    serviceBody: {
      color: textSecondary,
    },
  }
})

const ProgramsAndServices = () => {
  const programsAndServices = useStaticQuery(graphql`
    query ProgramsAndServices {
      allWordpressPost(
        filter: {
          categories: { elemMatch: { name: { eq: "Programs and Services" } } }
        }
      ) {
        edges {
          node {
            id
            title
            content
          }
        }
      }
    }
  `)
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Programs and Services" />

      <Typography variant="h4" className={classes.mainTitle}>
        Programs and Services
      </Typography>

      {programsAndServices.allWordpressPost.edges.map(({ node }, index) => {
        return (
          <Card className={classes.serviceSection} elevation={3} key={node.id}>
            <CardContent>
              <Typography
                variant="h4"
                dangerouslySetInnerHTML={{ __html: node.title }}
                className={classes.serviceTitle}
              />
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: node.content }}
                className={classes.serviceBody}
              />
            </CardContent>
          </Card>
        )
      })}
    </Layout>
  )
}

export default ProgramsAndServices
