import React from 'react';
import { Link } from 'gatsby';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const TitleAndDescription = ({ data }) => {
  const { title, description } = data.site.siteMetadata;

  return (
    <div>
      <Header>
        <Link to='/' >
          <h2>{title}</h2>
        </Link>
        <p>{description}</p>
      </Header>
    </div>
  );
};

export default TitleAndDescription;

