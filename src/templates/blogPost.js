import React from 'react';
import EnLayout from '../layouts/en.js';
import RuLayout from '../layouts/ru.js';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Metadata from '../components/Metadata';

const Template = ({ data, pageContext, location }) => {
  const { prev, next } = pageContext;
  const { mdx } = data;
  const { title, lang } = mdx.frontmatter;
  const { body } = mdx;
  const Layout = lang === 'ru' ? RuLayout : EnLayout;

  return (
    <Layout data={data} location={location}>
      <Metadata title={title} />
      <section>
        <h2>{title}</h2>
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
      }
    }
  }
`;

export default Template;
