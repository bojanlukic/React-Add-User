import React from "react";
import { NavLink} from "react-router-dom";
import "./Navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Navbar() {
  return (
    <div className="list">
      <ul>
        <li>
          <NavLink activeclassname="active" to="/">
            <div className="alignIcon">
              Home <HomeOutlinedIcon />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/add">
            <div>New User </div>
          </NavLink>
        </li>
        <li>
          <NavLink activeclassname="active" to="/about">
            <div>About</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
