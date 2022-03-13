import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "../../plugins/axios";
import "../board/CareerBoard.css";
import SearchBar from "./SearchBar";

function Faq(props) {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const idx = location.pathname.indexOf("/", 1);
  console.log(idx);
  const boardGroup = location.pathname.slice(1, idx);
  const boardName = location.pathname.slice(idx + 1);

  const [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let qType = searchParams.get("searchType");
  let qWord = searchParams.get("keyword");

  const [postInfo, setPostInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // const [pageNo, setPageNo] = useState(1);

  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");

  const [paginationNumber, setPaginationNumber] = useState(0);

  useEffect(() => {
    page = page === null ? 1 : page;
    qType = qType === null ? "" : qType;
    qWord = qWord === null ? "" : qWord;

    getFaq(page, qType, qWord);

    setPaginationNumber(parseInt(page));
  }, [page, qType, qWord]); //뒤로 가기시 페이지번호나 검색종류,검색어가 바뀌면 쿼리스트링으로 재검색)
  //게시판 하단 페이지네이션과 연동이 안되고 있는 상황임. 아직 방법을 모르겠다.

  const changePage = ({ selected }) => {
    getFaq(selected + 1, qType, qWord);
  };

  //리액트화면에서 검색결과 창에서 x버튼 누르면 타입과 검색처 초기화?
  async function getFaq(page, searchType, keyword) {
    let url = `/${boardName}`;

    await axios
      .get(url, {
        params: { page: page, searchType: searchType, keyword: keyword },
      })
      .then((response) => {
        const postList = response.data.content;
        for (const post of postList) {
          //작성시간 변환
          const date = new Date(post.postRegdate);
          post.postRegdate = dateFormat(date);
        }
        //업데이트
        setPostInfo(response.data);
        setPosts(postList);
        setPageCount(response.data.totalPages);

        navigate(
          `/${boardGroup}/${boardName}?page=${page}&searchType=${searchType}&keyword=${keyword}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  const getData = (posts, pageCount, searchType, keyword) => {
    //검색버튼 누르면 검색결과 1페이지 리스트랑 페이지정보 넘어옴.
    console.log(posts, pageCount, searchType, keyword);
    setPosts(posts);
    setPageCount(pageCount);
    setSearchType(searchType);
    setKeyword(keyword);
  };

  return (
    <div className="boardContainer">
      <div>
        <li>
          <Link to="/notice">공지사항;;;;; </Link>
          <Link to="/faq"> 자주하는질문;;;;; </Link>
        </li>
      </div>
      <h1 className="heading">{props.title}</h1>
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
        <tbody>
          {posts.map((post) => (
            <tr>
              <td>{post.postNo}</td>
              <td className="table-title">
                <Link to={`${post.postNo}`} className="postTableTitle">
                  {post.postTitle}
                </Link>
                {post.replyCount > 0 && <span>[{post.replyCount}]</span>}
              </td>
              <td>{post.nickname}</td>
              <td>{post.postLike}</td>
              <td>{post.postViews}</td>
              <td>{post.postRegdate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        pageCount={pageCount}
        forcePage={paginationNumber - 1}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <div>
        <SearchBar getData={getData} />
        <div className="writePostBtnWrapper">
          <button
            onClick={() => {
              navigate("/customer/faq/create");
            }}
            className="writePostBtn"
          >
            글쓰기
          </button>
        </div>
      </div>

      {/* <img src={"http://localhost:8000/get/image/springboot-oauth.jpg"} width="100%" alt="이미지" /> */}
      {/* ??????????????????????????????????????????????????????? */}
    </div>
  );
}
export default Faq;
