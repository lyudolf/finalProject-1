import "./App.css";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import Main from "../src/component/Main";
import MenuBar from "../src/component/MenuBar";

import { Route, Routes } from "react-router-dom"; //리액트 라우터

//아이디 및 비밀번호 찾기 라우터 연결------------------------------
import ForgetId from "./views/forget/ForgetId"; //아이디 찾기 처음화면
import ResultId from "./views/forget/ResultId"; //아이디찾기 결과
import ForgetPs from "./views/forget/ForgetPs"; // 비밀번호찾기
import ResetPs from "./views/forget/ResetPs"; // 비밀번호 리셋
import ResetCompleted from "./views/forget/ResetCompleted"; // 비밀번호 리셋완료
//--------------------------------------------------------------
import CareerBoard from "./views/board/CareerBoard"; // 테스트 커리어 게시판
import CustomerNotice from "./views/forget/CustomerNotice"; // 고객센터 공지사항게시판
import CustomerFaq from "./views/forget/Faq"; // 고객센터 공지사항게시판

//----------------------------------------------------------------------------

function App() {
  return (
    <div className="App">
      <Header />
      <MenuBar />

      <Routes>
        <Route path="/" element={<Main />} />

        {/* 아이디찾기 메인화면 */}
        <Route path="/login/find/id" element={<ForgetId />} />
        <Route path="/login/find/id/result/:uid" element={<ResultId />} />
        <Route path="/login/find/ps" element={<ForgetPs />} />
        <Route path="/login/find/ps/reset/:uid" element={<ResetPs />} />
        <Route path="/login/find/ps/done" element={<ResetCompleted />} />

        <Route path="/mainboard/careerboard" element={<CareerBoard />} />
        <Route path="/notice" element={<CustomerNotice />} />
        <Route path="/faq" element={<CustomerFaq />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
