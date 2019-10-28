import React from 'react';
import EnLayout from '../layouts/en.js';

const Portfolio = ({ messages: { title, content } }) => {
  return (
    <section>
      <h3>{title}</h3>
      {content}
    </section>
  )
}

export default Portfolio;
