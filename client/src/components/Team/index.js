import React from 'react';
import './about.scss';
import { User, Linkedin } from 'react-feather';

const Team = () => (
  <div className="about">
    <h2>Notre équipe</h2>
    <div className="team-container">

      <div className="teamcard">
        <div className="teamcard-picture">
          <User color="#2B7AFD" size={100} />
        </div>
        <div className="teamcard-content">
          <p className="teamcard-content-name">Bruno Sosin</p>
          <p className="teamcard-content-role">Product Owner/Git Master</p>
          <p className="teamcard-content-description">Maire de Cayenne</p>
        </div>
      </div>

      <div className="teamcard">
        <div className="teamcard-picture">
          <User color="#2B7AFD" size={100} />
        </div>
        <div className="teamcard-content">
          <p className="teamcard-content-name">Salim Bennis</p>
          <p className="teamcard-content-role">Lead Dev Back</p>
          <p className="teamcard-content-description">Petit ange parti trop tôt</p>
        </div>
      </div>

      <div className="teamcard">
        <div className="teamcard-picture">
          <User color="#2B7AFD" size={100} />
        </div>
        <div className="teamcard-content">
          <p className="teamcard-content-name">Pierre Beaufils</p>
          <p className="teamcard-content-role">Lead Dev Front</p>
          <p className="teamcard-content-description">L'important c'est les 3 points</p>
          <div className="teamcard-content-social">
            <a href="https://www.linkedin.com/in/pierre-beaufils/">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="teamcard">
        <div className="teamcard-picture">
          <User color="#2B7AFD" size={100} />
        </div>
        <div className="teamcard-content">
          <p className="teamcard-content-name">Wassime Slaiman</p>
          <p className="teamcard-content-role">Scrum master</p>
          <p className="teamcard-content-description">L'important c'est l'essentiel, et souvent l'essentiel c'est le plus important</p>
        </div>
      </div>
    </div>
  </div>
);

export default Team;
