import React from 'react';
import Card from '../components/Card';

const blogList = ({ edges }) => (
  <section>
    {edges.map(edge => {
      const { frontmatter } = edge.node;

      return (
        <Card
          data={frontmatter}
          key={frontmatter.path}
        />
      )
    })}
  </section>
);

export default blogList;
