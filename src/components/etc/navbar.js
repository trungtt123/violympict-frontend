import '../../css/navbar.css';
import React, { useState, useEffect } from 'react';
import { nav_item_isloggedin, nav_item_notloggedin } from './navitem';
function Navbar(props) {
    var isLoggedIn = props.isLoggedIn;
    var listNavItem = [];
    if (isLoggedIn === false) {
        listNavItem = nav_item_notloggedin;
    } else {
        listNavItem = nav_item_isloggedin;
    }
    var elmNavItem = listNavItem.map((item, index) => {
        var pathname = window.location.pathname;
        if (pathname === item.path) {
            return <li className="nav-item rounded" style={{backgroundColor: "white"}}>
                <a key={index} className="nav-link text-dark" href={item.path} style={{marginTop: "-4px"}}>
                    {item.nameItem}
                </a>
            </li>
        } return <li className="nav-item">
            <a key={index} className="nav-link text-light" href={item.path} style={{marginTop: "-4px"}}>
                {item.nameItem}
            </a>
        </li>
    });
    return (
        <div class="row">
            <div className="col-md-10 mx-auto">
                <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#0186bd", height: "40px", fontSize: "15px"}}>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto"style={{height: "30px"}} >
                            {elmNavItem}
                        </ul>

                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Tìm kiếm . . ." style={{height: "28px", fontSize: "14px", width: "160px"}}/>
                            <i class="bi bi-search cursor-pointer"></i>
                        </form>


                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;