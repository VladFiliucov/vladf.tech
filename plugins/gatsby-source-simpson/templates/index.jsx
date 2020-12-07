import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = ({ data, pageContext, location }) => {
  console.log(data, pageContext);
  return (
    <div>
      yo
    </div>
  );
}

export const query = graphql`
  query SimpsonsPage {
    allSimpson {
      edges {
        node {
          episode
          name
          thumbnailUrl
        }
      }
    }
  }
`;

export default Template;
