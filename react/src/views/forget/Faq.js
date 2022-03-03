
//공지사항 게시판 : /customer/notice/:페이지/:글번호
//자주하는 질문   : /customer/faq/:게시판페이지/:글번호
import React, { useState, useEffect, useCallback } from 'react';
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from '../../plugins/axios';
import "../board/CareerBoard.css";


function CustomerNotice() {

    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    let page = searchParams.get('page');
    // page = (page === null) ? 1 : page;

    const [postInfo, setPostInfo] = useState({});

    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // const [pageNumber, setPageNumber] = useState(0);



    useEffect(() => {
        page = (page === null) ? 1 : page;
        getFaq(page);
        // console.log("useEffect", page);
        // return function cleanup() {
        //     setPostInfo({});
        //     setPosts([]);
        // };
    }, []);

    const changePage = ({ selected }) => {
        // setPageNumber(selected);
        getFaq(selected + 1);
        // console.log(selected);
        // console.log(selected + 1);
        // console.log(page);
        console.log(location);
    };



    async function getFaq(page) {
        const url = location.pathname;
        await axios.get(url, { params: { page: page } })
            .then((response) => {

                //업데이트
                setPostInfo(response.data);
                setPosts(response.data.content);
                setPageCount(response.data.totalPages);
                navigate(`/faq?page=${page}`);

            })
            .catch((error) => { console.log(error) });
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
    const searchTitle = async function () {

        await axios.get("/faq/list/search", { params: { searchType: "title", keyword: "2" } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => { console.log(error) });
    };
    const searchContent = async function () {

        await axios.get("/faq/list/search", { params: { searchType: "content", keyword: "14" } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => { console.log(error) });
    };
    const searchTitleOrContent = async function () {

        await axios.get("/faq/list/search", { params: { searchType: "titleOrContent", keyword: "14" } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => { console.log(error) });
    };
    const searchWriter = async function () {

        await axios.get("/faq/list/search", { params: { searchType: "writer", keyword: "닉네임202" } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => { console.log(error) });
    };



    return (
        <div className="boardContainer">
            <div>
                <li>
                    <Link to="/notice">공지사항;;;;; </Link>
                    <Link to="/faq"> 자주하는질문;;;;; </Link>
                </li>
            </div>
            {/* <button onClick={onIncreasePage}>Page + 1</button> */}
            <div>공지사항게시판</div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>추천수</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>

                    {posts.map((post) => (
                        <tr>
                            <td>{post.postNo}</td>
                            <td className="table-title">{post.postTitle}</td>
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
                // pageCount={pageCount}
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

            <div>


                <button onClick={searchTitle}>
                    게시글제목검색
                </button>
                <button onClick={searchContent}>
                    게시글내용검색
                </button>
                <button onClick={searchTitleOrContent}>
                    게시글제목+내용검색
                </button>
                <button onClick={searchWriter}>
                    게시글 작성자 검색
                </button>
            </div>

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
export default CustomerNotice;

