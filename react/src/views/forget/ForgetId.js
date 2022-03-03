import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../plugins/axios';
import "./ForgetId.css";

function ForgetId() {
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState('');
    const [nameMsg, setNameMsg] = useState('');
    const [isValidName, setIsValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const onChangeName = event => {

        const value = event.target.value;
        const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
        setName(replaceValue);

        if (replaceValue.length === 0) {
            setNameMsg('')
            return;
        }

        //길이 체크
        if (replaceValue.length < 1 || 15 < replaceValue.length) {
            setNameMsg('이름을 다시 확인해주세요')
            return;
        }

        //형식 체크 
        const namePattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/; // 영어,한글만 가능
        // console.log(namePattern.test(replaceValue));
        if (namePattern.test(replaceValue)) {
            setIsValidName(true);
            setNameMsg("");
        } else {
            setIsValidName(false);
            setNameMsg("한글과 영문으로만 작성해주세요.");
        }

    };

    const onChangeEmail = event => {

        const value = event.target.value;
        const replaceValue = value.replace(/(\s*)/g, ""); //공백제거
        setEmail(replaceValue);

        if (replaceValue.length === 0) {
            setEmailMsg('')
            return;
        }
        //길이 체크
        if (replaceValue.length < 1 || 15 < replaceValue.length) {
            setEmailMsg('이메일을 다시 확인해주세요')
            return;
        }

        //형식 체크 
        const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        // console.log(namePattern.test(replaceValue));
        if (emailPattern.test(replaceValue)) {
            setIsValidEmail(true);
            setEmailMsg("");
        } else {
            setIsValidEmail(false);
            setEmailMsg("이메일을 다시 확인해주세요");
        }

    };

    const submitForm = async function (event) {
        event.preventDefault();

        if (!isValidEmail || !isValidName) {
            return;
        }

        await axios.get('/api/login/find/id', { params: { name: name, email: email } })
            .then((response) => {
                console.log(response.data)
                //성공시 아이디 결과화면 페이지로 이동
                navigate(`/login/find/id/result/${response.data}`)
            })
            .catch((error) => { console.log(error) });
    };


    return (
        <div className='mainBody'>
            <div className='navbar'>
                <div className='navbarHead'>아이디/비밀번호 찾기</div>
                <div className='navbarBody'>
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
            <div className='container'>
                <div className='title'>아이디 찾기</div>
                <hr></hr>
                <li>
                    <Link to="/login/find/id">아이디찾기;; </Link>
                    <Link to="/login/find/id/result">아이디결과;; </Link>
                    <Link to="/login/find/ps">비번 찾기;;</Link>
                    <Link to="/login/find/ps/reset">비번 리셋 화면;;</Link>
                    <Link to="/login/find/ps/done">비번 리셋완료;;;;</Link>
                    <Link to="/customer/notice">;;;cs)공지사항;;;</Link>
                    <Link to="/customer/faq">;;;cs)자주하는질문;;;</Link>

                </li>
                <div className='content'>
                    <div className='contentHeader'>아이디가 기억나지 않으세요?</div>
                    <div className='contentHeader'>아이디는 가입시 입력하신 성함, 이메일을 통해 찾을 수 있습니다.</div>
                    <hr />
                    <form className="searchForm">
                        <div className="nameInput">

                            <input
                                name="userName"
                                className='inputBox'
                                onChange={onChangeName}

                                placeholder="성함을 입력해주세요"
                            />
                            {(!isValidName) && <div className='errorMessage'>{nameMsg}</div>}

                        </div>
                        <div className="emailInput">

                            <input
                                name="email"
                                className='inputBox'
                                onChange={onChangeEmail}
                                placeholder="이메일을 입력해주세요"
                            />
                            {(!isValidEmail) && <div className='errorMessage'>{emailMsg}</div>}

                        </div>
                        <div ><button type='submit' className='searchBtn' onClick={submitForm}>찾기</button></div>
                        <div >
                            <Link to="/">
                                <button type='button' className='backBtn'> 로그인 화면으로 돌아가기 </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ForgetId;