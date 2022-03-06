import React, { useEffect, useState } from "react";
// import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import "./CareerBoard.css";
import { useNavigate } from "react-router-dom";
import axios from "../../plugins/axios";
import SearchBar from "./SearchBar";
import moment from "moment";
function CareerBoard() {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [reversedPosts, setReversedPosts] = useState([]);

  //현재 페이지 정보
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10;

  //현재 몇개 포스트를 봤는지 그 시작점을 알려줌. (나중에 슬라이스 할때 사용)
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (searchType, keyword) => {
    axios
      .get("/career/list/search", {
        params: { searchType, keyword },
      })
      .then((response) => setPosts(response.data || []))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("/career/list")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => setReversedPosts(posts.reverse()), [posts]);

  return (
    <div className="boardContainer">
      <div className="careerBoardTitle">취업상담게시판</div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>추천수</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>

        {/* 아까 그 시작점에서 pagesVisited, pagesVisited + postsPerPage(10개) 를 슬라이스 하면 그 페이지에 해당하는
      포스트를 보여줄 수 있음. */}
        {reversedPosts
          .slice(pagesVisited, pagesVisited + postsPerPage)
          .map((post, i) => (
            <tbody key={i}>
              <tr
                onClick={() => {
                  navigate(`/mainboard/post/${post.postNo}`);
                }}
              >
                <td>{post.postNo}</td>
                <td className="table-title">{post.postTitle}</td>
                {/* 닉네임 어떻게 가져오지? */}
                <td>{post.nickname}</td>
                <td>{post.postLike}</td>
                <td>{post.postViews}</td>

                <td>{moment(post.postRegdate).format("l")}</td>
              </tr>
            </tbody>
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
          <SearchBar handleSearch={handleSearch} />
          <button
            onClick={() => {
              if (
                //벡엔드 연결되면 필요한 부분 수정
                localStorage.getItem("user")
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
