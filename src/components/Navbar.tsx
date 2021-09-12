import React from 'react';
import { Link, withRouter } from 'react-router-dom';
function Navbar() {
    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <div className="menu-nav-icon" data-nav-menu="#main-menu">
                    <i className="ion-navicon" />
                </div>
                <ul className="main-menu visible-on-click" id="main-menu">
                    <li><Link className={"nav-link"} to={"/"}> Home </Link></li>
                    {(
                    <li><Link className={"nav-link"} to={"/create"}> Create </Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
}
export default withRouter(Navbar);