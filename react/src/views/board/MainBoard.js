import React from "react";
import { Link, Outlet } from "react-router-dom";

function MainBoard() {
  return (
    <div>
      <div>
        <Link to="/mainboard/careerboard">취업준비게시판</Link>
        <Link to="/mainboard/technews">IT뉴스 게시판</Link>
        <Outlet />
      </div>
    </div>
  );
}

export default MainBoard;
