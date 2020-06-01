import * as React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="section">
      <div className="grid grid-wide">
        <div className="sm-grid4">
          <div className="section">
            <div className="contain">
              <div className="profile-wrap">
                <div className="profile-header">
                  <h1 className="alt-font alpha text-center">😲 Not Found</h1>
                  <p className="text-center">
                    The page you're looking for is missing.<br />
                    Try navigating to the <Link to="/">homepage</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}