// Routing
import { NavLink } from "react-router-dom";

//style
import "./SideNavbar.css";

function SideNavbar({ data, title }) {
  return (
    <div className="sidebarWrapper">
      <div className="sideBarTitle">{title}</div>
      <div className="navMenuItems">
        <ul>
          {data.map((item, index) => {
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
