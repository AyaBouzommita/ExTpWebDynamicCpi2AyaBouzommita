import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material';
import './navbar.css';
import { UserContext } from '../UserContext';

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><Link to="/"><img src="https://th.bing.com/th/id/OIP.A0ftihq1_3THfDPB-yH3wQHaHa?rs=1&pid=ImgDetMain" alt="Logo" /></Link></li>
          <li><Link to="/Art">Art</Link></li>
          <li><Link to="/Technologie">Technologie</Link></li>
          <li><Link to="/Sciences">Sciences</Link></li>
          <li><Link to="/Cinema">Cinema</Link></li>
          <li><Link to="/write">Write</Link></li>
          <li>{user ? user.username : 'Guest'}</li>
          <li><Link to="/login"><ExitToApp /></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;