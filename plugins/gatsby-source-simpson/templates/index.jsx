import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = ({ data: { allSimpson } }) => {
  return (
    <div>
      {allSimpson.edges.map(simpson => {
          console.log(simpson.node);
        return (
          <div>
            <h2>{simpson.node.name}</h2>
            <img src={simpson.node.thumbnailUrl} />
          </div>
        )
      })}
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
