import React from 'react';
import logo from '../assets/investment-calculator-logo.jpg';

const Header = ({title, subtitle}) => {
  return (
    <header id="header">
      <img src={logo} alt="Investment Calculator Logo" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
};

export default Header;