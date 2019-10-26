import React from 'react';
import EnLayout from '../layouts/en.js';
import RuLayout from '../layouts/ru.js';
import { graphql, Link } from 'gatsby';

const Template = ({ data, pageContext, location }) => {
  const { prev, next } = pageContext;
  const { markdownRemark } = data;
  const { title, lang } = markdownRemark.frontmatter;
  const { html } = markdownRemark;
  const Layout = lang === 'ru' ? RuLayout : EnLayout;

  return (
    <Layout data={data} location={location}>
      <section>
        <h1>{title}</h1>
        <div className="blogpost"
          dangerouslySetInnerHTML={{__html: html}}
        />
        { prev && <Link to={prev.frontmatter.path} >prev</Link> }
        { next && <Link to={next.frontmatter.path} >next</Link> }
      </section>
    </Layout>
  );
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: {path: { eq: $pathSlug }}) {
      html
      frontmatter {
        title
        lang
      }
    }
  }
`;

export default Template;
