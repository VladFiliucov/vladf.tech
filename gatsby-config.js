module.exports = {
  siteMetadata: {
    title: 'Vlad F Tech',
    description: 'Vlad Filiucov personal website'
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-plugin-antd`,
    `gatsby-plugin-csp`
  ]
};
