import React from 'react';
import { Link } from 'gatsby';
import letterV from '../../images/letter-v.svg';
import SelectLanguage from './SelectLanguage';
import './Header.css';

const Header = ({ data, localeData }) => {
  const { title, description } = data.site.siteMetadata;
  const { langsMenu, homeLink } = localeData;
  const { about, portfolio, tags, mainHeading } = localeData.messages;
  const aboutLink = `${homeLink}/about`;
  const portfolioLink = `${homeLink}/portfolio`;
  const tagsLink = `${homeLink}/tags`;

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
          <Link to={aboutLink} >
            {about}
          </Link>
        </div>
        <div className="nav-item">
          <Link to={portfolioLink} className="nav-item">
            {portfolio}
          </Link>
        </div>
        <div className="nav-item">
          <Link to={tagsLink} className="nav-item">
            {tags}
          </Link>
        </div>
      </nav>
      <h1>{mainHeading}</h1>
      <SelectLanguage langs={langsMenu} />
    </header>
  );
};

export default Header;

