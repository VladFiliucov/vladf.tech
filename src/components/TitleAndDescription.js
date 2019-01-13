import React from 'react';
import { Link } from 'gatsby';
import { Layout, Menu } from 'antd';
import letterV from '../../images/letter-v.svg'

const { Header } = Layout;

const logoStyles = {
  width: '2.2rem'
}

const headerStyles = {
  backgroundImage: 'linear-gradient(to bottom left, #9ad8fd, #7eaee3)'
}

const TitleAndDescription = ({ data }) => {
  const { title, description } = data.site.siteMetadata;

  return (
    <div>
      <Header style={headerStyles}>
        <Link to='/' >
          <img style={logoStyles} src={letterV} alt="Vlad Filiucov logo" />
        </Link>
      </Header>
    </div>
  );
};

export default TitleAndDescription;

