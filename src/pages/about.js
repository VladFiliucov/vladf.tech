import React from 'react';
import EnLayout from '../layouts/en.js';
import aboutMessages from '../data/about';
import AboutSection from '../templates/AboutSection';

const EnAboutPage = ({data, location}) => (
  <EnLayout data={data} location={location}>
    <AboutSection messages={aboutMessages} />
  </EnLayout>
);

export default EnAboutPage;
