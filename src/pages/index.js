import React from 'react';
import EnLayout from '../layouts/en.js';
import BlogList from '../templates/blogList';

const EnHomePage = ({data, location}) => (
  <EnLayout data={data} location={location}>
    <BlogList edges={data.allMarkdownRemark.edges} />
  </EnLayout>
);

export const query = graphql`
  query EnHomepageQuery {
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

export default EnHomePage;
