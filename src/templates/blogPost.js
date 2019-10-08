import React from 'react';
import { graphql, Link } from 'gatsby';

import HeaderContainer from '../components/HeaderContainer';

const Template = ({ data, pageContext }) => {
  const { prev, next } = pageContext;
  const { markdownRemark } = data;
  const { title } = markdownRemark.frontmatter;
  const { html } = markdownRemark;

  return (
    <div>
      <HeaderContainer />
      <h1>{title}</h1>
      <div className="blogpost"
        dangerouslySetInnerHTML={{__html: html}}
      />
      { prev && <Link to={prev.frontmatter.path} >prev</Link> }
      { next && <Link to={next.frontmatter.path} >next</Link> }
    </div>
  );
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: {path: { eq: $pathSlug }}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
