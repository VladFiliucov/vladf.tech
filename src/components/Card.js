import React from 'react';
import { Link } from 'gatsby';
import './Card.css';

const Card = props => {
  const { path, title } = props.data;

  return (
    <div className='postcard'>
      {
        <Link to={path} >
          {title}
        </Link>
      }
    </div>
  );
};

export default Card;
