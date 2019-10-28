import React from "react"
import { graphql, Link } from 'gatsby';
import EnLayout from '../layouts/en.js';
import RuLayout from '../layouts/ru.js';
import enTagsMessages from '../data/tags';
import ruTagsMessages from '../data/tags/ru.js';

const AllTagsTemplate = ({data, pageContext, location}) => {
  const { tags, lang } = pageContext;
  const Layout = lang === 'ru' ? RuLayout : EnLayout;
  const messages = lang === 'ru' ? ruTagsMessages : enTagsMessages;
  const prefix = lang === 'ru' ? '/ru/tags/' : '/tags/';

  return (
    <Layout data={data} location={location}>
      <section>
        <h2>{messages.title}</h2>
        <ul>
          {
            tags.map((tagName, index) => {
              return (
                <li key={`tag-${index}`}>
                  <Link to={`${prefix + tagName}`} >
                    {tagName}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </section>
    </Layout>
  )
}

export default AllTagsTemplate;
