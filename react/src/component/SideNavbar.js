// Routing
import { NavLink } from "react-router-dom";

//style
import styles from "./SideNavbar.module.css";

function SideNavbar({ data, title }) {
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sideBarTitle}>{title}</div>
      <div className={styles.navMenuItems}>
        <ul>
          {data.map((item, index) => {
            return (
              <li key={index} className={styles.sideBarLiTag}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.activeClass : styles.notActiveClass
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
