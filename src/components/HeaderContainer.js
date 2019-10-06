import React from 'react';
import Header from './Header';
import { StaticQuery, graphql } from 'gatsby';

const HeaderContainer = () => {
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
        data => <Header data={data} />
      }
    />
  );
}

export default HeaderContainer;

