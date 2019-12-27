const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allWordpressPost(
        filter: { categories: { elemMatch: { name: { eq: "Announcements" } } } }
      ) {
        edges {
          node {
            excerpt
            date
            id
            slug
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

  const postTemplate = path.resolve(`./src/templates/post.js`)
  result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      // will be the url for the page
      path: `posts/${edge.node.slug}`,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
