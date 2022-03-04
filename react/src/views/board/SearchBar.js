import { useState } from "react";
import React from "react";
import JsonData from "./MOCK_DATA.json";
import "./SearchBar.css";

function SearchBar() {
  const [searchBy, setSearchBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="searchBarContainer">
      {/* option의 value는 서버에 보내질 값 */}
      <select
        className="searchBarDrowdown"
        value={searchBy}
        onChange={(event) => setSearchBy(event.target.value)}
      >
        <option value="searchAll">전체검색</option>
        <option value="byTitle">제목</option>
        <option value="byContent">내용</option>
        <option value="byNickname">작성자</option>
      </select>
      <input
        className="searchBarInput"
        type="text"
        placeholder="검색어를 입력해주세요"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      <button className="searchBarInputBtn">검색</button>
    </div>
  );
}

export default SearchBar;
