import React from 'react';
import EnLayout from '../layouts/en.js';

const About = ({ messages: { title, content } }) => {
  return (
    <section>
      <h3>{title}</h3>
      {content}
    </section>
  )
}

export default About;
