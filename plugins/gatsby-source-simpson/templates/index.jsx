import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from "gatsby-image";

const Template = ({ data: { allSimpson } }) => {
  return (
    <div>
      {allSimpson.edges.map(simpson => {
          console.log(simpson.node.thumbnail.childImageSharp.fluid);
        return (
          <div>
            <h2>{simpson.node.name}</h2>
            <Img fluid={simpson.node.thumbnail.childImageSharp.fluid} />
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
          thumbnail {
            childImageSharp {
              id
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          episode
          name
          thumbnailUrl
        }
      }
    }
  }
`;

export default Template;
