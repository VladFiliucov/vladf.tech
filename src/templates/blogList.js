import React from 'react';
import Card from '../components/Card';
import Hero from '../components/Hero';
import Metadata from '../components/Metadata';

const blogList = ({ edges }) => (
  <>
    <Hero />
    <section>
      <Metadata title="Vlad's blog" />
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
  </>
);

export default blogList;
