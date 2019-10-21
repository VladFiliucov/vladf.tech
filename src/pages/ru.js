import React from "react"
import RuLayout from '../layouts/ru.js'

const RuHomePage = ({data, location}) => <RuLayout data={data} location={location} />;

export const query = graphql`
  query RuHomepageQuery {
    allMarkdownRemark (
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`

export default RuHomePage;
