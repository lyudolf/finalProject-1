import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ForgetData } from "../../component/ForgetData";

function Find() {
  return (
    <div>
      <div className="sidebarWrapper">
        <div className="sideBarTitle">아이디/비밀번호 찾기</div>
        <div className="navMenuItems">
          <ul>
            {ForgetData.map((item, index) => {
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
      <Outlet />
    </div>
  );
}

export default Find;
