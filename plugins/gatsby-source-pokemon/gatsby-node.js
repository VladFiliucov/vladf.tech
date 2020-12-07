async function pokemonToNode({ actions, createNodeId, createContentDigest }) {
  console.log("GOT HERE YEHAA");
}

exports.sourceNodes = async props => {
  await Promise.all([pokemonToNode(props)]);
}
