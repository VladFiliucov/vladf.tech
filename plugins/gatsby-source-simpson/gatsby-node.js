const fetch = require('isomorphic-fetch');
const path = require('path');
const { createRemoteFileNode } = require("gatsby-source-filesystem");

async function pokemonToNode({ actions, createNodeId, createContentDigest }) {
  const response = await fetch('https://sampleapis.com/simpsons/api/episodes', {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
  const simps = await response.json();
  const simpsons = simps.slice(3, 13);
  simpsons.forEach(simpson => {
    const nodeMeta = {
      id: createNodeId(`simpson-${simpson.season}-${simpson.episode}`),
      parent: null,
      children: [],
      internal: {
        type: 'Simpson',
        mediaType: 'application/json',
        contentDigest: createContentDigest(simpson)
      }
    }
    actions.createNode({...simpson, ...nodeMeta})
  })
}

exports.sourceNodes = async props => {
  await Promise.all([pokemonToNode(props)]);
}

exports.createResolvers = ({actions,cache,createNodeId,createResolvers,store,reporter,}) => {
  const { createNode } = actions
  createResolvers({
    Simpson: {
      thumbnail: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.thumbnailUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = async ({ actions: { createPage } }) => {
  createPage({
    path: 'simpsons',
    component: path.resolve(`${__dirname}/templates/index.jsx`),
    context: {
      slug: 'simpsons',
      uriPath: 'simpsons',
    },
  })
}
