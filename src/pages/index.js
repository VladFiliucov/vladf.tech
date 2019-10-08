import React from "react"
import { Helmet } from 'react-helmet';
import HeaderContainer from '../components/HeaderContainer';
import { graphql, Link } from 'gatsby';
import './home.css';

const Layout = ({data}) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Filiucov's personal blog</title>
        <link rel="canonical" href="http://vladf.tech" />
      </Helmet>
      <div className='main-container'>
        <HeaderContainer />
        <section>
          {edges.map(edge => {
            const { frontmatter } = edge.node;

            return (
              <div className='postcard' key={frontmatter.path}>
                {
                  <Link to={frontmatter.path} >
                    {frontmatter.title}
                  </Link>
                }
              </div>
            );
          })}
        </section>
        <footer>Footer</footer>
      </div>
    </>
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
