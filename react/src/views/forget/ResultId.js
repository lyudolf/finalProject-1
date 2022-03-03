import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../plugins/axios';
import "./ResultId.css";


function ResultId() {

    const params = useParams();
    const foundId = params.uid;

    return (
        <div className='mainBody1'>
            <div className='navbar1'>
                <div className='navbarHead1'>아이디/비밀번호 찾기</div>
                <div className='navbarBody1'>
                    <ul>
                        <Link to="/login/find/id">
                            <li>아이디 찾기</li>
                        </Link>
                        <Link to="/login/find/ps">
                            <li>비밀번호 찾기</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className='container1'>
                <div className='title1'>아이디 찾기</div>
                <hr></hr>
                <li>
                    <Link to="/login/find/id">아이디 찾기 메인;;;;; </Link>
                    <Link to="/login/find/id/result">아이디 찾기 결과;;;;; </Link>
                    <Link to="/login/find/ps">비번 찾기;;;;;</Link>
                    <Link to="/login/find/ps/reset">비번 리셋 화면;;;;;;;</Link>
                    <Link to="/login/find/ps/done">비번 리셋완료;;;;;;;;;;</Link>
                </li>
                <div className='content1'>
                    <div className='contentHeader1'>아이디 찾기 결과 </div>
                    <hr />
                    <form className="searchForm1">
                        <div className='contentHeader1'>회원가입시 사용하신 아이디는" {foundId} "입니다.</div>
                        <div >
                            <Link to="/login/find/ps">
                                <button type='button' className='findPsBtn1'> 비밀번호 찾기 </button>
                            </Link>
                        </div>
                        <div >
                            <Link to="/">
                                <button type='button' className='backBtn1'> 로그인 화면으로 돌아가기 </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}





export default ResultId;