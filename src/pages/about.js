import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography, makeStyles } from "@material-ui/core"
import { getTitleStyles } from "."
import { getBodyCopyStyles } from "../theme"

const useStyles = makeStyles(theme => {
  return {
    title: {
      ...getTitleStyles(theme),
    },
    bodyCopy: {
      ...getBodyCopyStyles(theme),
      paddingBottom: theme.spacing(8),
    },
    evenSection: {},
    "@global": {
      img: {
        width: "100%",
      },
      figure: {
        margin: 0,
      },
    },
  }
})

const AboutPage = () => {
  const classes = useStyles()

  const aboutUsContent = useStaticQuery(graphql`
    query AboutUsContent {
      aboutTheImam: wordpressPost(
        categories: {
          elemMatch: {
            parent_element: { name: { eq: "About" } }
            name: { eq: "About the Imam" }
          }
        }
      ) {
        id
        title
        content
      }
      history: wordpressPost(
        categories: {
          elemMatch: {
            parent_element: { name: { eq: "About" } }
            name: { eq: "History" }
          }
        }
      ) {
        id
        title
        content
      }
      mission: wordpressPost(
        categories: {
          elemMatch: {
            parent_element: { name: { eq: "About" } }
            name: { eq: "Mission" }
          }
        }
      ) {
        id
        title
        content
      }
      objectives: wordpressPost(
        categories: {
          elemMatch: {
            parent_element: { name: { eq: "About" } }
            name: { eq: "Objectives" }
          }
        }
      ) {
        id
        title
        content
      }
      boardMembers: wordpressPost(
        categories: {
          elemMatch: {
            parent_element: { name: { eq: "About" } }
            name: { eq: "Board Members" }
          }
        }
      ) {
        id
        title
        content
      }
    }
  `)

  const {
    mission,
    objectives,
    history,
    aboutTheImam,
    boardMembers,
  } = aboutUsContent

  return (
    <Layout>
      <SEO title="About Us" />

      {Object.keys({
        mission,
        objectives,
        history,
        aboutTheImam,
        boardMembers,
      }).map((key, index) => {
        const { id, title, content } = aboutUsContent[key]

        return (
          <div className={index % 2 !== 0 ? classes.evenSection : ""} key={id}>
            <Typography variant="h4" className={classes.title}>
              {title}
            </Typography>

            <Typography
              variant="body1"
              className={classes.bodyCopy}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default AboutPage
