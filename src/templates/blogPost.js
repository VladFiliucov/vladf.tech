import React from 'react';
import EnLayout from '../layouts/en.js';
import RuLayout from '../layouts/ru.js';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from "gatsby-image"

const Template = ({ data, pageContext, location }) => {
  const { prev, next } = pageContext;
  const { mdx } = data;
  const { title, lang, remoteimage } = mdx.frontmatter;
  const { fluid } = mdx.localImage.childImageSharp;
  const { body } = mdx;
  const Layout = lang === 'ru' ? RuLayout : EnLayout;

  return (
    <Layout data={data} location={location}>
      <section>
        <h2>{title}</h2>
          { fluid && <Img fluid={fluid} alt="does local image work" />}
        <div className="blogpost" >
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        { prev && <Link to={prev.frontmatter.path} >prev</Link> }
        { next && <Link to={next.frontmatter.path} >next</Link> }
      </section>
    </Layout>
  );
}

export const query = graphql`
  query($pathSlug: String!) {
    mdx(frontmatter: {path: { eq: $pathSlug }}) {
      body
      frontmatter {
        title
        lang
        remoteimage
      }
      localImage {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

export default Template;
