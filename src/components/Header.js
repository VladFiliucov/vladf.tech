import React from 'react';
import { Link } from 'gatsby';
import letterV from '../../images/letter-v.svg';
import './Header.css';

const logoStyles = {
  width: '2.2rem',
  margin: '2em',
}

const headerStyles = {
  backgroundImage: 'linear-gradient(to bottom left, #9ad8fd, #7eaee3)'
}

const Header = ({ data }) => {
  const { title, description } = data.site.siteMetadata;

  return (
    <header>
      <nav>
        <div className="logo nav-item">
          <Link to='/'>
            <img style={logoStyles} src={letterV} alt="Vlad Filiucov logo" />
          </Link>
          <Link to='/' className='pagetitlelink nav-item'>
            <span>
              VLADF
            </span>
          </Link>
        </div>
        <Link to='/' className="nav-item">
          About me
        </Link>
        <Link to='/tags' className="nav-item">
          Tags
        </Link>
        <Link to='/portfolio' className="nav-item">
          Portfolio
        </Link>
      </nav>
    </header>
  );
};

export default Header;

