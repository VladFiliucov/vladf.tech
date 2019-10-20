const languages = require('./src/data/languages');

module.exports = {
  siteMetadata: {
    title: 'Vlad F Tech',
    description: 'Vlad Filiucov personal website',
    languages
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
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'ru',
        useLangKeyLayout: true
      }
    },
  ]
};
