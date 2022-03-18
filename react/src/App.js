import "./App.css";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import Main from "../src/component/Main";
import MenuBar from "../src/component/MenuBar";
import React, { useState } from "react";

import { Route, Routes } from "react-router-dom"; //리액트 라우터

//로그인 라우터 연결---------------------------------------------
import Login from "./views/login/Login"; //로그인

//아이디 및 비밀번호 찾기 라우터 연결------------------------------
import ForgetId from "./views/forget/ForgetId"; //아이디 찾기 처음화면
import ResultId from "./views/forget/ResultId"; //아이디찾기 결과
import ForgetPs from "./views/forget/ForgetPs"; // 비밀번호찾기
import ResetPs from "./views/forget/ResetPs"; // 비밀번호 리셋
import ResetCompleted from "./views/forget/ResetCompleted"; // 비밀번호 리셋완료
import Find from "./views/forget/Find";

//회원가입 라우터 연결--------------------------------------------
import Check from "./views/signup/Check"; //개인정보 동의서
import Registercopy from "./views/signup/Registercopy"; //회원가입폼

//게시판---------------------------------------------------------
import MainBoard from "./views/board/MainBoard"; //메인게시판

import CreatePost from "./views/board/CreatePost"; //게시판 글쓰기

import TechNews from "./views/board/itnews/TechNews"; //it뉴스게시판

import CustomerFaq from "./views/forget/Faq"; // 고객센터 자주하는질문게시판
import FaqPost from "./views/forget/FaqPost"; //글 보기
import CareerBoardcopy from "./views/board/CareerBoardcopy";
import UpdatePost from "./views/board/UpdatePost";

//---------------------------------------------------
import data from "../src/views/Review/Reviewdata.js"; //국비지원리뷰의 데이터
import ReviewMain from "../src/views/Review/ReviewMain"; //국비지원 리뷰창
import Detail from "../src/views/Review/Detail";
//-----------------------------------------------------
import Study from "../src/views/Study/study";
//-----------------------------------------------

import Company from "./views/Footer/company"; // 푸터 상세페이지
import Tos from "./views/Footer/Tos";
//-----------------------------------------------
import NotFound from "./views/NotFound"; //404 page
import CreatePostCust from "./views/Study/CreatePostCust";
import StudyPost from "./views/Study/StudyPost";

//----------------------------------------------------------------------------

function App() {
  let [shoes, shoes1] = useState(data);

  return (
    <div className="App">
      <Header />
      <MenuBar />

      <Routes>
        <Route path="/" element={<Main />} />
        {/* 로그인 메인화면 */}

        <Route path="/login" element={<Login />} />

        {/* 아이디찾기 메인화면 */}
        <Route path="/find" element={<Find />}>
          <Route path="id" element={<ForgetId />} />
          <Route path="id/result/:uid" element={<ResultId />} />
          <Route path="ps" element={<ForgetPs />} />
          <Route path="ps/reset/:uid" element={<ResetPs />} />
          <Route path="ps/done" element={<ResetCompleted />} />
        </Route>

        {/* 회원가입화면 */}
        <Route path="/signup" element={<Check />} />
        <Route path="/register" element={<Registercopy />} />

        {/* 게시판 메인화면 */}
        <Route path="/mainboard" element={<MainBoard />}>
          <Route path="technews" element={<TechNews />} />
          <Route path="career" element={<CustomerFaq title="취업준비" />} />
          <Route path="career/:postno" element={<FaqPost />} />
          <Route path="career/create" element={<CreatePost />} />
          <Route path="career/:postno/update" element={<UpdatePost />} />
          <Route path="careerboardcopy" element={<CareerBoardcopy />} />
        </Route>

        <Route
          path="/customer/notice"
          element={<CustomerFaq title="공지사항" />}
        />
        <Route path="/customer/notice/:postno" element={<FaqPost />} />
        <Route path="/customer/notice/create" element={<CreatePost />} />
        <Route
          path="/customer/notice/:postno/update"
          element={<UpdatePost />}
        />

        <Route
          path="/customer/faq"
          element={<CustomerFaq title="고객센터" />}
        />
        <Route path="/customer/faq/:postno" element={<FaqPost />} />
        <Route path="/customer/faq/create" element={<CreatePost />} />
        <Route path="/customer/faq/:postno/update" element={<UpdatePost />} />

        {/* 국비교육 */}
        <Route
          path="/reviewmain"
          element={<ReviewMain shoes={shoes} shoes1={shoes1} />}
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        {/* 스터디모집 */}
        <Route path="/together/study" element={<Study />} />
        <Route path="/together/study/create" element={<CreatePostCust />} />
        <Route path="/together/study/:postno" element={<StudyPost />} />
        {/* 푸터 */}
        <Route path="/Company" element={<Company />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
