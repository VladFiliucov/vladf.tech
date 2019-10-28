import React from 'react';
import EnLayout from '../layouts/en.js';
import portfolioMessages from '../data/portfolio';
import PortfolioSection from '../templates/PortfolioSection';

const EnPortfolioPage = ({data, location}) => (
  <EnLayout data={data} location={location}>
    <PortfolioSection messages={portfolioMessages} />
  </EnLayout>
);

export default EnPortfolioPage;
