import React from 'react';
import { Link } from 'react-router-dom';
export default () => {
  return (
    <div>
      <Link to="client/add" className="btn btn-primary btn-block">
        <i className="fa fa-plus mb-2" />
        New
      </Link>
    </div>
  );
};
