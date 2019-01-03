import React from 'react';
import { Link } from 'gatsby';

const TitleAndDescription = ({ data }) => {
  const { title, description } = data.site.siteMetadata;

  return (
    <div>
      <Link to='/' >
        <h2>{title}</h2>
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default TitleAndDescription;

