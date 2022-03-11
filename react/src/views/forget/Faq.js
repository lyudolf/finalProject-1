import React, { useState, useEffect, useCallback } from 'react';
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from '../../plugins/axios';
import "../board/CareerBoard.css";
import SearchBar from "./SearchBar";


function Faq() {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);
    const idx = location.pathname.indexOf("/", 1);
    console.log(idx);
    const boardGroup = location.pathname.slice(1, idx);
    const boardName = location.pathname.slice(idx + 1);
    console.log(boardName);

    const [searchParams, setSearchParams] = useSearchParams();
    let page = searchParams.get('page');
    let qType = searchParams.get('searchType');
    let qWord = searchParams.get('keyword');

    const [postInfo, setPostInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // const [pageNo, setPageNo] = useState(1);

    const [searchType, setSearchType] = useState('');
    const [keyword, setKeyword] = useState('');


    const [paginationNumber, setPaginationNumber] = useState(0);

    useEffect(() => {
        page = (page === null) ? 1 : page;
        qType = (qType === null) ? '' : qType;
        qWord = (qWord === null) ? '' : qWord;

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


        await axios.get(url, { params: { page: page, searchType: searchType, keyword: keyword } })
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

                navigate(`/${boardGroup}/${boardName}?page=${page}&searchType=${searchType}&keyword=${keyword}`);

            })
            .catch((error) => { console.log(error) });
    };
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
    };

    const getPost = async function () {
        await axios.get('/faq/106') // 50번글 조회
            .then((response) => {
                console.log(response.data)

            })
            .catch((error) => { console.log(error) });
    };


    const [categoryArr, setCategoryArr] = useState([]);
    const [cateKey, setKey] = useState('지역');
    const [cateValue, setValue] = useState('');

    function cateAdd() {
        const kind = cateKey;//카테고리 종류 
        const value = cateValue; // 카테고리 값

        const replaceValue = value.replace(/(\s*)/g, ""); //공백제거

        if (replaceValue.length === 0) {
            return;
        }

        const cate = {};
        cate[`${cateKey}`] = replaceValue;

        setCategoryArr([...categoryArr, cate]);
        setValue('');

        //필요시 추가로 처리할 부분 작성


        console.log("추가됨:", cate);
        console.log("전체:", categoryArr);
    }
    const onChangeKey = event => {

        const value = event.target.value;
        setKey(value);

    };
    const onChangeValue = event => {

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

        await axios.post("/faq", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data)
        })
            .catch((error) => { console.log(error) });
    };
    const updatePost = async function () {

        const formData = new FormData();
        formData.append("title", "게시글제목수정3");
        formData.append("content", "게시글 내용수정@@!!");
        formData.append("nickname", "닉네임3");
        formData.append("category", JSON.stringify(categoryArr));

        //게시글 수정
        await axios.put("/faq/106", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data)
        })
            .catch((error) => { console.log(error) });
    };
    const deletePost = async function () {

        const formData = new FormData();

        formData.append("nickname", "닉네임3");

        //95번 게시글 삭제
        await axios.delete("/faq/95", { params: { nickname: "닉네임3" } }).then((response) => {
            console.log(response.data)
        })
            .catch((error) => { console.log(error) });
    };

    const getData = (posts, pageCount, searchType, keyword) => {

        //검색버튼 누르면 검색결과 1페이지 리스트랑 페이지정보 넘어옴.
        console.log(posts, pageCount, searchType, keyword);
        setPosts(posts);
        setPageCount(pageCount);
        setSearchType(searchType);
        setKeyword(keyword);
    }

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
                                <Link to={`${post.postNo}`}>
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
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                forcePage={paginationNumber - 1}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            <div className="careerBoardSearchWrapper">

                <SearchBar getData={getData} />
                <button
                    // onClick={() => {
                    //     if (true
                    //         // localStorage.getItem("email") &&
                    //         // localStorage.getItem("name") &&
                    //         // localStorage.getItem("id")
                    //     ) {
                    //         window.location.href = "/mainboard/createpost";
                    //     } else {
                    //     }
                    // }}
                    onClick={() => {
                        navigate('/faq/create');
                    }}
                    className="createPostBtn"
                >
                    글쓰기
                </button>
            </div>


            {/* <img src={"http://localhost:8000/get/image/springboot-oauth.jpg"} width="100%" alt="이미지" /> */}
            {/* ??????????????????????????????????????????????????????? */}
            <div>

                <button onClick={getPost}>
                    게시글정보받기
                </button>
                <button onClick={submitPost}>
                    게시글등록
                </button>
                <button onClick={updatePost}>
                    게시글업데이트
                </button>
                <button onClick={deletePost}>
                    게시글삭제
                </button>
            </div>


            <div>
                <select onChange={onChangeKey}>
                    <option key="지역" value="지역">지역</option>
                    <option key="사용 언어" value="사용 언어">사용 언어</option>
                    <option key="수준" value="수준">수준</option>
                    <option key="분야" value="분야">분야</option>
                </select>
                <input onChange={onChangeValue} placeholder="카테고리 값" />
                <button onClick={cateAdd}>
                    카테고리 추가버튼
                </button>
            </div>
        </div>
    );
}
export default Faq;

