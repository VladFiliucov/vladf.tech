import React from 'react';
import RuLayout from '../../layouts/ru.js';
import portfolioMessages from '../../data/about/ru.js';
import PortfolioSection from '../../templates/PortfolioSection';

const RuPortfolioPage = ({data, location}) => (
  <RuLayout data={data} location={location}>
    <PortfolioSection messages={portfolioMessages} />
  </RuLayout>
);

export default RuPortfolioPage;
