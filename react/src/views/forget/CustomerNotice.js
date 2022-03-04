import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../plugins/axios";
import "../board/CareerBoard.css";
import JsonData from "../board/MOCK_DATA.json";

function CustomerNotice() {
  const [posts, setPosts] = useState(JsonData);
  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getNotice = async function () {
    // { params: { name: name, email: email } }
    await axios
      .get("/notice/list")
      .then((response) => {
        console.log(response.data);
        //내용 추가
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFaq = async function () {
    // { params: { name: name, email: email } }
    await axios
      .get("/faq/list")
      .then((response) => {
        console.log(response.data);
        //내용 추가
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPost = async function () {
    await axios
      .get("/faq/35") // 50번글 조회
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [categoryArr, setCategoryArr] = useState([]);
  const [cateKey, setKey] = useState("");
  const [cateValue, setValue] = useState("");

  function cateAdd() {
    const kind = cateKey; //카테고리 종류
    const value = cateValue; // 카테고리 값

    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거

    if (replaceValue.length === 0) {
      return;
    }

    const cate = {};
    cate[`${cateKey}`] = replaceValue;

    setCategoryArr([...categoryArr, cate]);
    setValue("");

    //필요시 추가로 처리할 부분 작성

    console.log("추가됨:", cate);
    console.log("전체:", categoryArr);
  }
  const onChangeKey = (event) => {
    const value = event.target.value;
    setKey(value);
  };
  const onChangeValue = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
    setValue(replaceValue);
  };
  const submitPost = async function () {
    //카테고리 : {종류: 이름} 형식으로 보내기 배열로 합쳐서 보내기

    const formData = new FormData();
    formData.append("title", "게시글제목");
    formData.append("content", "게시글 내용~~~");
    formData.append("nickname", "닉네임3");
    formData.append("category", JSON.stringify(categoryArr));

    await axios
      .post("/faq", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updatePost = async function () {
    const formData = new FormData();
    formData.append("title", "게시글제목수정");
    formData.append("content", "게시글 내용수정@@!!");
    formData.append("nickname", "닉네임3");

    //65번 게시글 수정
    await axios
      .put("/faq/65", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deletePost = async function () {
    const formData = new FormData();

    formData.append("nickname", "닉네임3");

    //95번 게시글 삭제
    await axios
      .delete("/faq/95", { params: { nickname: "닉네임3" } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchTitle = async function () {
    await axios
      .get("/faq/list/search", {
        params: { searchType: "title", keyword: "2" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchContent = async function () {
    await axios
      .get("/faq/list/search", {
        params: { searchType: "content", keyword: "14" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchTitleOrContent = async function () {
    await axios
      .get("/faq/list/search", {
        params: { searchType: "titleOrContent", keyword: "14" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const searchWriter = async function () {
    await axios
      .get("/faq/list/search", {
        params: { searchType: "writer", keyword: "닉네임202" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="boardContainer">
      <div>
        <li>
          <Link to="/notice">공지사항;;;;; </Link>
          <Link to="/faq"> 자주하는질문;;;;; </Link>
        </li>
      </div>
      <div>공지사항게시판</div>
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
      <button onClick={getNotice}>공지사항 게시판 데이터 받기</button>
      <button onClick={getFaq}>자주하는질문게시판 데이터 받기</button>

      <button onClick={searchTitle}>게시글제목검색</button>
      <button onClick={searchContent}>게시글내용검색</button>
      <button onClick={searchTitleOrContent}>게시글제목+내용검색</button>
      <button onClick={searchWriter}>게시글 작성자 검색</button>

      <button onClick={getPost}>게시글정보받기</button>
      <button onClick={submitPost}>게시글등록</button>
      <button onClick={updatePost}>게시글업데이트</button>
      <button onClick={deletePost}>게시글삭제</button>
      <button onClick={cateAdd}>카테고리 추가버튼</button>

      <select onChange={onChangeKey}>
        <option key="지역" value="지역">
          지역
        </option>
        <option key="사용 언어" value="사용 언어">
          사용 언어
        </option>
        <option key="수준" value="수준">
          수준
        </option>
        <option key="분야" value="분야">
          분야
        </option>
      </select>
      <input onChange={onChangeValue} placeholder="카테고리 값" />
    </div>
  );
}
export default CustomerNotice;
