import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../../component/SideNavbar";
import { CustomerData } from "../../component/CustomerData";

function Customer() {
  return (
    <div>
      <div>
        <SideNavbar data={CustomerData} title="공지사항" />
        <Outlet />
      </div>
    </div>
  );
}

export default Customer;
