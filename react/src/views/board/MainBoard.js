import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../../component/SideNavbar";

function MainBoard() {
  return (
    <div>
      <div>
        <SideNavbar />
        <Outlet />
        {/* <div style={{ height: "500px" }}>메인보드 내용 들어가야함</div> */}
      </div>
    </div>
  );
}

export default MainBoard;
