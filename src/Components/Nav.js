import './App.css';
import logo from './img/logo.svg';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav id="nav">
      <Link to="/"><img src={logo} alt="react logo"/></Link>
      <ul>
        <Link to="/local"><li>Local</li></Link>
        <Link to="/global"><li>Global</li></Link>
      </ul>
    </nav>    
  )
}

export default Nav;
