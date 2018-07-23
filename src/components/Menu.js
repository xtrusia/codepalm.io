import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {

  render() {
    return (
      <ul className="menu">
        <li id="logo"><Link to="/">CODEPALM</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/home">Home</Link></li>
      </ul>
    )
  }
}

export default Menu