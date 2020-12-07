const fetch = require('isomorphic-fetch');

async function pokemonToNode({ actions, createNodeId, createContentDigest }) {
  const response = await fetch('https://sampleapis.com/simpsons/api/episodes', {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
  const simps = await response.json();
  const simpsons = simps.slice(0, 10);
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
