import * as React from 'react';
import { Link } from 'react-router-dom';

export const Hi = () => {
  return (
  <div className="section">
    <div className="grid grid-wide">
      <div className="sm-grid4">
        <div className="section">
          <div className="contain">
            <div className="profile-wrap">
              <div className="profile-header">
                <h1 className="alt-font alpha text-center">Hello there</h1>
                <p className="text-center">
                  <Link to="/">Home</Link>&nbsp;|&nbsp; 
                  <Link to="/create">Create</Link>
                </p>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </div>
  )
}