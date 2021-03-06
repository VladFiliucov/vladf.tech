import React from "react"
import RuLayout from '../layouts/ru.js'
import BlogList from '../templates/blogList';

const RuHomePage = ({data, location}) => (
  <RuLayout data={data} location={location}>
    <BlogList edges={data.allMdx.edges} />
  </RuLayout>
);

export const query = graphql`
  query RuHomepageQuery {
    allMdx (
      sort: {order: DESC, fields: [frontmatter___date]},
      filter: {frontmatter: {lang: {eq: "ru"}}}
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
