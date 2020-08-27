import React from 'react';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';
import './SelectLanguage.css';

const SelectLanguage = (props) => {
  const { showLangs } = props;
  const links = props.langs.map(lang => {
    const enPage = lang.url.indexOf('/ru') == -1
    const homePage = (lang.url === '/' || lang.url === '/ru' || lang.url === '/ru/');
    let address = lang.link

    if (enPage && !homePage && lang.langKey === 'en') {
      address = lang.url;
    } else if (enPage && !homePage && lang.langKey === 'ru') {
      address = `/ru/${lang.url}`;
    }

    return (
      <Link
        title={showLangs ? `Switch language to ${lang.langKey}` : 'Switching language is not enabled on this page'}
        to={address.replace('//', '/')}
        key={lang.langKey}
        style={{
          pointerEvents: showLangs ? '' : 'none',
          color: 'white',
        }}
      >
        <li selected={lang.selected}>
          {lang.langKey}
        </li>
      </Link>
    )
  });

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
