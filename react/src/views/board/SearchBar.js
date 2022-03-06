import { useState } from "react";
import React from "react";
// import JsonData from "./MOCK_DATA.json";
import "./SearchBar.css";
// import axios from "../../plugins/axios";

function SearchBar({ handleSearch }) {
  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearchSubmit = () => {
    handleSearch(searchType, keyword);
    setKeyword("");
  };

  return (
    <div className="searchBarContainer">
      {/* option의 value는 서버에 보내질 값 */}
      <select
        className="searchBarDrowdown"
        value={searchType}
        onChange={(event) => setSearchType(event.target.value)}
      >
        <option value="titleOrContent">전체검색</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="writer">작성자</option>
      </select>
      <input
        className="searchBarInput"
        type="text"
        placeholder="검색어를 입력해주세요"
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
      ></input>
      <button onClick={handleSearchSubmit} className="searchBarInputBtn">
        검색
      </button>
    </div>
  );
}

export default SearchBar;
