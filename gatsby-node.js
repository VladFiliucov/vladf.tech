const path  = require('path');

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js');
  const singleTagTemplate = path.resolve('src/templates/singleTagIndex.js');

  const postsByTag = {
    "ru": {},
    "en": {},
  };

  posts.forEach(({node}) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        const lang = node.frontmatter.lang;

        if (!postsByTag[lang][tag]) {
          postsByTag[lang][tag] = [];
        }

        postsByTag[lang][tag].push(node);
      })
    }
  });

  const ruTags = Object.keys(postsByTag.ru);
  const enTags = Object.keys(postsByTag.en);

  const createTagPageForLang = (tags, lang) => {
    const prefix = lang === 'en' ? '/tags/' : '/ru/tags/'

    createPage({
      path: prefix,
      component: allTagsIndexTemplate,
      context: {
        tags: tags.sort(),
        lang: lang,
      }
    })

    tags.forEach(tagName => {
      const posts = postsByTag[lang][tagName]

      createPage({
        path: `${prefix + tagName}`,
        component: singleTagTemplate,
        context: {
          posts,
          tagName,
          lang,
        }
      })
    })
  }

  createTagPageForLang(ruTags, 'ru');
  createTagPageForLang(enTags, 'en');
}

exports.createPages = (({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js')

    resolve(
      graphql(
        `
          query {
            allMdx (
              sort: {order: ASC, fields: [frontmatter___date]}
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                    tags
                    lang
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const allPosts = result.data.allMdx.edges;
        const enPosts = allPosts.filter(({node}) => node.frontmatter.lang === 'en');
        const ruPosts = allPosts.filter(({node}) => node.frontmatter.lang === 'ru');

        createTagPages(createPage, allPosts)

        const createPostPagesForLangs = posts => {
          posts.forEach(({node}, index) => {
            const path = node.frontmatter.path;

            createPage({
              path,
              component: blogPostTemplate,
              context: {
                pathSlug: path,
                prev: index === 0 ? null : posts[index - 1].node,
                next: index === (posts.length - 1) ? null : posts[index + 1].node
              }
            })
          })
        }

        createPostPagesForLangs(enPosts);
        createPostPagesForLangs(ruPosts);
      })
      .catch(error => console.log(error))
    )
  })
});
