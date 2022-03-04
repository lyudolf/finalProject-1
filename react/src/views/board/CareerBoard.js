import React, { useEffect, useState } from "react";
import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import "./CareerBoard.css";
import { useNavigate } from "react-router-dom";
import axios from '../../plugins/axios';
import SearchBar from "./SearchBar";

function CareerBoard() {
  let navigate = useNavigate();

  const [posts, setPosts] = useState(JsonData);

  //현재 페이지 정보
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10;

  //현재 몇개 포스트를 봤는지 그 시작점을 알려줌. (나중에 슬라이스 할때 사용)
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get("/api/carrer")
      .then((response) => {
        console.log(response.data);
        //내용 추가
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="boardContainer">
      <div className="careerBoardTitle">취업상담게시판</div>
      <table>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>추천수</th>
          <th>조회수</th>
          <th>작성일</th>
        </tr>

        {/* 아까 그 시작점에서 pagesVisited, pagesVisited + postsPerPage(10개) 를 슬라이스 하면 그 페이지에 해당하는
      포스트를 보여줄 수 있음. */}
        {posts.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => (
          <tr
            onClick={() => {
              navigate(`/mainboard/post/${post.postNo}`);
            }}
          >
            <td>{post.postNo}</td>
            <td className="table-title">{post.postTitle}</td>
            <td>{post.postLike}</td>
            <td>{post.postViews}</td>
            <td>{post.postRegdate}</td>
          </tr>
        ))}
      </table>
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
        <div className="careerBoardSearchWrapper">
          <SearchBar />
          <button
            onClick={() => {
              if (
                localStorage.getItem("email") &&
                localStorage.getItem("name") &&
                localStorage.getItem("id")
              ) {
                window.location.href = "/mainboard/createpost";
              } else {
                alert("You need be logged in");
              }
            }}
            className="createPostBtn"
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerBoard;
