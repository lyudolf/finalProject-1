import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../../component/SideNavbar";
import { ForgetData } from "../../component/ForgetData";

function Find() {
  return (
    <div>
      <div>
        <SideNavbar data={ForgetData} title="아이디/비번찾기" />
        <Outlet />
      </div>
    </div>
  );
}

export default Find;
