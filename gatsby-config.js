const clientName = "El-Zahra Islamic Center"

module.exports = {
  siteMetadata: {
    title: clientName,
    description: `Masjid in Midland Park, New Jersey`,
    author: `Yazeed Bzadough`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: clientName,
        short_name: `El-Zahra`,
        start_url: `/`,
        background_color: `#251C77`,
        theme_color: `#F31A76`,
        display: `minimal-ui`,
        icon: `src/images/elzahra-logo.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your WordPress source
        baseUrl: `localhost:8888/elzahra`,
        protocol: `http`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
