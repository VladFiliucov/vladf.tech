import React from 'react'
import EnLayout from '../layouts/en.js';
import RuLayout from '../layouts/ru.js';
import { graphql, Link } from 'gatsby';
import enTagsMessages from '../data/tag';
import ruTagsMessages from '../data/tag/ru.js';

const SingleTagTemplate = ({ data, pageContext, location }) => {
  const { posts, tagName, lang } = pageContext
  const Layout = lang === 'ru' ? RuLayout : EnLayout;
  const messages = lang === 'ru' ? ruTagsMessages : enTagsMessages;

  return (
    <Layout data={data} location={location} showLangs={false}>
      <section>
        <h2>
          {messages.title + `"${tagName}"`}
        </h2>
        <ul>
          {
            posts.map((post, index) => {
              return (
                <li key={`post-${index}`}>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
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

export default SingleTagTemplate;
