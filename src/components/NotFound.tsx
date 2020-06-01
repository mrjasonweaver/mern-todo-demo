import * as React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="section">
      <h2 className="alt-font alpha text-center">😲 Not Found</h2>
      <p className="text-center">
        The page you're looking for is missing.<br />
        Try navigating to the <Link to="/">homepage</Link>.
      </p>
    </div>
  );
}