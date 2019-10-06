import React from 'react';
import { Link } from 'gatsby';
import letterV from '../../images/letter-v.svg';
import './TitleAndDescription.css';

const logoStyles = {
  width: '2.2rem',
  margin: '2em'
}

const headerStyles = {
  backgroundImage: 'linear-gradient(to bottom left, #9ad8fd, #7eaee3)'
}

const Header = ({ data }) => {
  const { title, description } = data.site.siteMetadata;

  return (
    <header>
      <nav>
        <div className="logo">
          <img style={logoStyles} src={letterV} alt="Vlad Filiucov logo" />
        </div>
        <div className='l1'>
          <a href="/html/">HTML</a>
        </div>
        <Link to='/' className="l2">
          About me
        </Link>
        <div className='l3'>
          <a href="/js/">JavaScript</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;

