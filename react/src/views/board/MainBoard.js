import React from "react";
import { Link, Outlet } from "react-router-dom";

function MainBoard() {
  return (
    <div>
      MainBoard
      <div>
        <Link to="/mainboard/careerboard">취업준비게시판 CareerBoard</Link>
        <Outlet />
      </div>
    </div>
  );
}

export default MainBoard;
