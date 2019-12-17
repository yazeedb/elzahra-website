import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography, makeStyles } from "@material-ui/core"
import { textSecondary, primaryMain } from "../theme"
import { getTitleStyles } from "."

const useStyles = makeStyles(theme => {
  return {
    mainTitle: getTitleStyles(theme),
    serviceTitle: {
      fontWeight: "bold",
    },
    serviceSection: {
      borderTop: `5px solid ${primaryMain}`,
      paddingTop: theme.spacing(2),
      marginTop: theme.spacing(16),
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

      {programsAndServices.allWordpressPost.edges.map(({ node }) => {
        return (
          <div className={classes.serviceSection} elevation={3} key={node.id}>
            <Typography
              variant="h5"
              dangerouslySetInnerHTML={{ __html: node.title }}
              className={classes.serviceTitle}
            />
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: node.content }}
              className={classes.serviceBody}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default ProgramsAndServices
