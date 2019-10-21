import React from 'react';
import { Link } from 'gatsby';
import letterV from '../../images/letter-v.svg';
import './Header.css';

const Header = ({ data, localeData }) => {
  const { title, description } = data.site.siteMetadata;
  console.log(localeData);
  const { langsMenu, homeLink } = localeData;
  console.log(homeLink);
  const { about, portfolio, tags, mainHeading } = localeData.messages;

  return (
    <header>
      <nav>
        <div className="logo nav-item">
          <Link to={homeLink} >
            <img src={letterV} alt="Vlad Filiucov logo" />
          </Link>
          <Link to={homeLink} className='pagetitlelink'>
            <span>
              VLADF
            </span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/' >
            {about}
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/portfolio' className="nav-item">
            {portfolio}
          </Link>
        </div>
        <div className="nav-item">
          <Link to='/tags' className="nav-item">
            {tags}
          </Link>
        </div>
      </nav>
      <h1>{mainHeading}</h1>
    </header>
  );
};

export default Header;

