import React from 'react';
import './success.css';
import img from './../../img/slider/imgonline-2.jpg';

const Success: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="project-details">
          <h1 className="title-1">Біздің жетістіктеріміз</h1>
          <img src={img} alt="Success" className="project-details__cover" />
          <div className="project-details__desc">
            <p>Тәрбиешілермен тәрбиенушіліредің жетістіктері</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Success;