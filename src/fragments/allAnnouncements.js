import { graphql } from "gatsby"

export const allAnnouncementsFragment = graphql`
  fragment AllAnnouncementsFragment on wordpress__POSTConnection {
    edges {
      node {
        excerpt
        date
        id
        path
        title
        slug
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
`
