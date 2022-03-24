import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../../component/SideNavbar";
import { MypageData } from "../../component/MypageData";


function Mypage(){

    return (
        <div>
          <div>
            <SideNavbar data={MypageData} title="마이페이지" />
            <Outlet />
          </div>
        </div>
      );
    }
    
    export default Mypage;