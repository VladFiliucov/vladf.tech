import React from 'react';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';
import './SelectLanguage.css';

const SelectLanguage = (props) => {
  const links = props.langs.map(lang =>
    <Link to={lang.link} key={lang.langKey} style={{
      color: 'white',
    }}>
      <li selected={lang.selected}>
        {lang.langKey}
      </li>
    </Link>
  );

  return (
    <span className="langSelect">
      <ul style={
        {
          listStyle: 'none'
        }
      }>
        {links}
      </ul>
    </span>
  );
};

export default SelectLanguage;
