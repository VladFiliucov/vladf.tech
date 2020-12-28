import React from 'react';
import { Link } from 'gatsby';

import './index.css';

const TestPage = () => {
  return <div className="container">
    <Link to="/" >
      Back to homepage
    </Link>
  </div>
};

export default TestPage;
