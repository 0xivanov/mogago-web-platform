import React from 'react';
import '.././App.css';

const Header = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;