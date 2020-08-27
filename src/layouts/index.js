import React from 'react';
import { Helmet } from 'react-helmet';
import HeaderContainer from '../components/HeaderContainer';
import Footer from '../components/Footer';
import { graphql, StaticQuery } from 'gatsby';
import { IntlProvider  } from 'react-intl';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import './mainLayout.css';

const Layout = ({location, i18nMessages, children, showLangs = true}) => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              languages {
                defaultLangKey
                langs
              }
            }
          }
        }
      `}
      render={
        data => {
          const url = location.pathname;
          const { langs, defaultLangKey } = data.site.siteMetadata.languages;
          const langKey = getCurrentLangKey(langs, defaultLangKey, url);
          const homeLink = `/${langKey}`.replace(`/${defaultLangKey}`, '');
          const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))
            .map((item) => {
              const sanitizedLink = item.link.replace(`/${defaultLangKey}/`, '').replace('//', '/');
              return ({ ...item, link: sanitizedLink, url: url})
            })

          return (
            <IntlProvider
              locale={langKey}
              messages={i18nMessages}
            >
              <div>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>Filiucov's personal blog</title>
                  <link rel="canonical" href="http://vladf.tech" />
                </Helmet>
                <div className='main-container'>
                  <HeaderContainer
                    messages={i18nMessages.header}
                    langsMenu={langsMenu}
                    homeLink={homeLink}
                    showLangs={showLangs}
                  />
                  {children}
                  <Footer />
                </div>
              </div>
            </IntlProvider>
          )
        }
      }
    />
  )
}

export default Layout;
