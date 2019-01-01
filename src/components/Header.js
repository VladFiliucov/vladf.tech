import React from 'react';
import TitleAndDescription from './TitleAndDescription';
import { StaticQuery, graphql } from 'gatsby';

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={
        data => <TitleAndDescription data={data} />
      }
    />
  );
}

export default Header;

