import React from "react"
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import { graphql, Link } from 'gatsby';

const Layout = ({data}) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Filiucov's personal blog</title>
        <link rel="canonical" href="http://vladf.tech" />
      </Helmet>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node;

        return (
          <div key={frontmatter.path}>
            {
              <Link to={frontmatter.path} >
                {frontmatter.title}
              </Link>
            }
          </div>
        );
      })}
      <div>
        <Link to='/tags' >
          Browse tags
        </Link>
      </div>
    </div>
  )
}

export const query = graphql`
  query HomepageQuery {
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

export default Layout;
