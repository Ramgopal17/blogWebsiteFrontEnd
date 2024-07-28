import React from "react";
import menu_data from "./menu-data-new";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <>
      <ul style={{display:"flex", gap:'10px'}}>
        {menu_data?.map((item, i) => (
          <li
            key={i}
            style={{ "--tp-theme-redical": "rgb(12,84,173)" }}
            className={`${item.has_dropdown ? "has-dropdown" : ""} 
    `}
          >
            <Link to={item.link} target={i !== 0 ? "_blank" : ""} >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
