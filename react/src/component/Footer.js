import React from "react";
import "./Footer.css";
import chodaeLogo from "../assets/Chodae-logo.png";

function Footer() {
  return (
    <div className="footer">
      <div className="companyInfo">
        <strong>회사소개 | 이용약관 | 개인정보처리방침 | 고객센터</strong>
      </div>
      <div className="companyDetail">
        <div className="Logo">
          <img className="chodaeLogo" src={chodaeLogo} alt=""></img>
        </div>
        <div className="companyDetails">
          <span>
            <strong>상호명 </strong>: (주)CHODAE | <strong>대표명 </strong> :
            이도현 | <strong>사업자등록번호 </strong>: 111-11-11112 |
          </span>
          <span>
            <strong>문의</strong> : chodae@chodae.kr
          </span>
          <span>
            <strong>주소</strong> : 서울 강남구 봉은사로 303 초대빌딩 1001호
            (06103)
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
