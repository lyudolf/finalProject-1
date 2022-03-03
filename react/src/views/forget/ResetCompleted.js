import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../plugins/axios';
import "./ResetCompleted.css";

function ResetCompleted() {
    return (
        <div className='mainBody4'>
            <div className='navbar4'>
                <div className='navbarHead4'>아이디/비밀번호 찾기</div>
                <div className='navbarBody4'>
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
            <div className='container4'>
                <div className='title4'>비밀번호 찾기</div>
                <hr></hr>
                <li>
                    <Link to="/login/find/id">아이디 찾기 메인;;;;; </Link>
                    <Link to="/login/find/id/result">아이디 찾기 결과;;;;; </Link>
                    <Link to="/login/find/ps">비번 찾기;;;;;</Link>
                    <Link to="/login/find/ps/reset">비번 리셋 화면;;;;;;;</Link>
                    <Link to="/login/find/ps/done">비번 리셋완료;;;;;;;;;;</Link>
                </li>
                <div className='content4'>
                    <div className='contentHeader4'>비밀번호 재설정을 완료했습니다.</div>
                    <div className='contentHeader4'>로그인 화면으로 이동해서 다시 로그인 해주시기 바랍니다.</div>
                    <hr />
                    <form className="searchForm4">


                        <div >
                            <Link to="/">
                                <button type='button' className='backBtn4'> 로그인 화면으로 돌아가기 </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}





export default ResetCompleted;