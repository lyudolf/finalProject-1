import "./App.css";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import Main from "../src/component/Main";
import MenuBar from "../src/component/MenuBar";

import { Route, Routes } from "react-router-dom"; //리액트 라우터

//로그인 라우터 연결---------------------------------------------
import Login from "./views/login/Login"; //로그인

//아이디 및 비밀번호 찾기 라우터 연결------------------------------
import ForgetId from "./views/forget/ForgetId"; //아이디 찾기 처음화면
import ResultId from "./views/forget/ResultId"; //아이디찾기 결과
import ForgetPs from "./views/forget/ForgetPs"; // 비밀번호찾기
import ResetPs from "./views/forget/ResetPs"; // 비밀번호 리셋
import ResetCompleted from "./views/forget/ResetCompleted"; // 비밀번호 리셋완료

//회원가입 라우터 연결--------------------------------------------
import Check from "./views/signup/Check"; //개인정보 동의서
import Registercopy from "./views/signup/Registercopy"; //회원가입폼

//게시판---------------------------------------------------------
import MainBoard from "./views/board/MainBoard"; //메인게시판
import CareerBoard from "./views/board/CareerBoard"; //취업상담게시판
import CreatePost from "./views/board/CreatePost"; //게시판 글쓰기
import Post from "./views/board/Post"; //글 보기
import TechNews from "./views/board/itnews/index"; //it뉴스게시판

import CustomerNotice from "./views/forget/CustomerNotice"; // 고객센터 공지사항게시판
import CustomerFaq from "./views/forget/Faq"; // 고객센터 자주하는질문게시판
import FaqPost from "./views/forget/FaqPost"; //글 보기
import Front from "./views/board/Front";
import CareerBoardcopy from "./views/board/CareerBoardcopy";
import UpdatePost from "./views/board/UpdatePost";

//----------------------------------------------------------------------------

function App() {
  return (
    <div className="App">
      <Header />
      <MenuBar />

      <Routes>
        <Route path="/" element={<Main />} />
        {/* 로그인 메인화면 */}

        <Route path="/login" element={<Login />} />

        {/* 아이디찾기 메인화면 */}
        <Route path="/login/find/id" element={<ForgetId />} />
        <Route path="/login/find/id/result/:uid" element={<ResultId />} />
        <Route path="/login/find/ps" element={<ForgetPs />} />
        <Route path="/login/find/ps/reset/:uid" element={<ResetPs />} />
        <Route path="/login/find/ps/done" element={<ResetCompleted />} />
        {/* 회원가입화면 */}
        <Route path="/signup" element={<Check />} />
        <Route path="/register" element={<Registercopy />} />
        {/* 게시판 메인화면 */}
        <Route path="/mainboard" element={<MainBoard />}>
          <Route path="technews" element={<TechNews />} />
          <Route path="careerboardcopy" element={<CareerBoardcopy />} />
          <Route path="study" element={<Front />} />
        </Route>

        <Route path="/mainboard/career" element={<CustomerFaq />} />
        <Route path="/mainboard/career/:postno" element={<FaqPost />} />
        <Route path="/mainboard/career/create" element={<CreatePost />} />
        <Route path="/mainboard/career/:postno/update" element={<UpdatePost />} />


        <Route path="/customer/notice" element={<CustomerFaq />} />
        <Route path="/customer/notice/:postno" element={<FaqPost />} />
        <Route path="/customer/notice/create" element={<CreatePost />} />
        <Route path="/customer/notice/:postno/update" element={<UpdatePost />} />

        <Route path="/customer/faq" element={<CustomerFaq />} />
        <Route path="/customer/faq/:postno" element={<FaqPost />} />
        <Route path="/customer/faq/create" element={<CreatePost />} />
        <Route path="/customer/faq/:postno/update" element={<UpdatePost />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
