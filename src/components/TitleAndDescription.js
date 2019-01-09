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
          <span>{title}</span>
        </Link>
      </Header>
    </div>
  );
};

export default TitleAndDescription;

