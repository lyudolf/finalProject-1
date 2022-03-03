import React, { useState } from "react";
import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import "./CareerBoard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../plugins/axios';

function CareerBoard() {
  const [posts, setPosts] = useState(JsonData);
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getData = async function () {
    // { params: { name: name, email: email } }
    await axios.get('/api/carrer')
      .then((response) => {
        console.log(response.data)
        //내용 추가
        setPosts(response.data);
      })
      .catch((error) => { console.log(error) });
  };

  return (
    <div className="boardContainer">
      <div>취업상담게시판</div>
      <table>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>추천수</th>
          <th>조회수</th>
          <th>작성일</th>
        </tr>

        {posts.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => (
          <tr>
            <td>{post.postNo}</td>
            <td className="table-title">{post.postTitle}</td>
            <td>{post.postLike}</td>
            <td>{post.postViews}</td>
            <td>{post.postRegdate}</td>
          </tr>
        ))}
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      <button>
        <Link to="/mainboard/createpost">글쓰기</Link>
      </button>
      <button onClick={getData}>
        데이터 받기
      </button>
    </div>
  );
}

export default CareerBoard;
