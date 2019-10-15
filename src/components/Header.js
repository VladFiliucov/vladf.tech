import React from 'react';
import { Link } from 'gatsby';
import letterV from '../../images/letter-v.svg';
import './Header.css';

const logoStyles = {
  width: '2.2rem',
  margin: '1em 2em',
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
          <Link to='/' className='pagetitlelink'>
            <span>
              VLADF
            </span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/' >
            About
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/portfolio' className="nav-item">
            Portfolio
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/tags' className="nav-item">
            Tags
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

