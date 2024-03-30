import React from 'react';
import Logo from '../assets/img/logofull.png';
import LogoCompact from '../assets/img/logocfull.png';
import { Link } from 'react-router-dom';
import '../assets/css/NavBar.css';

function NavBar() {

    return (
        <nav className="navbar shadow fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="nav-logo" src={Logo} alt="Vital Plus Logo" />
                    <img className="nav-logo-compact" src={LogoCompact} alt="Vital Plus Compact Logo" />
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;