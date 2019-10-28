import React from 'react';
import RuLayout from '../../layouts/ru.js';
import aboutMessages from '../../data/about/ru.js';
import AboutSection from '../../templates/AboutSection';

const RuAboutPage = ({data, location}) => (
  <RuLayout data={data} location={location}>
    <AboutSection messages={aboutMessages} />
  </RuLayout>
);

export default RuAboutPage;
