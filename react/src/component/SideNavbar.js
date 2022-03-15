// Routing
import { NavLink } from "react-router-dom";

// Data File
import { MainboardData } from "./MainboardData";

//style
import "./SideNavbar.css";

function SideNavbar() {
  return (
    <div className="sidebarWrapper">
      <div className="sideBarTitle">게시판</div>
      <div className="navMenuItems">
        <ul>
          {MainboardData.map((item, index) => {
            return (
              <li key={index} className="sideBarLiTag">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "activeClass" : "notActiveClass"
                  }
                  to={item.path}
                >
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideNavbar;
