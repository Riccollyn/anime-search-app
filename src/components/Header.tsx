import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => (
  <header className="header navbar navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Anime Search</Link>
    </div>
  </header>
);

export default Header;