import React from 'react';
import { Link } from 'gatsby';

import 'css-paint-polyfill';
import './index.css';
import workletURL from 'file-loader!houdini-static-gradient';

CSS.paintWorklet.addModule(workletURL);

const TestPage = () => (
  <div className="container">
    <Link to="/" >
      Back to homepage
    </Link>
  </div>
);

export default TestPage;
