import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Typography, makeStyles } from "@material-ui/core"
import { getTitleStyles } from "."
import { getBodyCopyStyles, borderRadius } from "../theme"

const useStyles = makeStyles(theme => {
  const bodyCopy = {
    ...getBodyCopyStyles(theme),
    "& ul": {
      padding: 0,
      listStyleType: "none",

      "& li": {
        marginTop: 30,
      },
    },

    "& img": {
      width: "100%",
      borderRadius,
      margin: `${theme.spacing(2)}px 0`,
    },
    "& figure": {
      margin: 0,
    },
  }

  return {
    title: {
      ...getTitleStyles(theme),
      paddingTop: theme.spacing(8),
    },
    bodyCopy: bodyCopy,
    boardMembersBodyCopy: {
      ...bodyCopy,
      textAlign: "center",
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
      }).map(key => {
        const { id, title, content } = aboutUsContent[key]

        return (
          <div key={id}>
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

      {
        <div>
          <Typography variant="h4" className={classes.title}>
            {boardMembers.title}
          </Typography>

          <Typography
            variant="body1"
            className={classes.boardMembersBodyCopy}
            dangerouslySetInnerHTML={{ __html: boardMembers.content }}
          />
        </div>
      }
    </Layout>
  )
}

export default AboutPage
