import React from 'react';
import { Link } from 'gatsby';
import letterV from '../../images/letter-v.svg';
import './Header.css';

const Header = ({ data }) => {
  const { title, description } = data.site.siteMetadata;

  return (
    <header>
      <nav>
        <div className="logo nav-item">
          <Link to='/'>
            <img src={letterV} alt="Vlad Filiucov logo" />
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
      <h1>Tech journey to senior engineer</h1>
    </header>
  );
};

export default Header;

