import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Typography, makeStyles } from "@material-ui/core"
import elzahraLogo from "../images/elzahra-logo.jpg"
import { getBodyCopyStyles } from "../theme"
import { getTitleStyles } from "../pages"

const useStyles = makeStyles(theme => {
  return {
    img: {
      width: "100%",
    },
    title: getTitleStyles(theme),
    content: getBodyCopyStyles(),
  }
})

const Post = ({ data: { wordpressPost } }) => {
  const { title, date, content } = wordpressPost
  const img = wordpressPost.featured_media
    ? wordpressPost.featured_media.localFile.childImageSharp.fluid.src
    : elzahraLogo

  const classes = useStyles()

  return (
    <Layout>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>

      <img src={img} className={classes.img} />

      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: content }}
        className={classes.content}
      />
    </Layout>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
      id
      title
      date
      content
      slug
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
`

export default Post
