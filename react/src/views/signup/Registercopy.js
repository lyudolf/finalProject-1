import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Register.css";

const Registercopy = () => {
  const phoneRegExp = /^[0-9]{11}$/;
  //const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("필수 정보입니다"),

    nickname: Yup.string()
      .max(8, "영문,한글 최대 8글자 이내 입력 가능")
      .test("중복검사", "이미 사용중인 닉네임 입니다", function (values) {
        const nickname = values;
        const promise1 = axios
          .get("http://localhost:8000/reg/me/nickname", {
            params: { nickname: nickname },
          })
          .then((res) => {
            console.log(res.data);
            if (!res.data) {
              console.log("같은 닉네임 없어");
              console.log(res.data);
              return true;
            } else console.log("같은 닉네임 있어");
            return false;
          })
          .catch((error) => {
            console.log(error.res);
            Promise.reject(error); //에러 무시인데 400에러만 무시할수있도록? 수정? axios 안에서
            //일어난 일이니 상관 없을수도?
          });
        return promise1; //여기가 true or false
      })
      .required("필수 정보입니다"),

    email: Yup.string()
      .email("이메일을 확인해주세요") // .matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,"이메일을 확인해주세요")
      .required("필수 정보입니다") // 유효성 대체가능, ___ @ ____ 방식으로 바꾸려면 2가지를 보내느건가? 다 끝나고 시간나면 수정
      .test("중복검사", "이미 사용중인 이메일입니다", function (values) {
        const email = values;
        const promise = axios
          .get("http://localhost:8000/reg/me/email", {
            params: { email: email },
          })
          .then((res) => {
            console.log(res.data);
            if (!res.data) {
              console.log("같은 아이디 없어");
              return true;
            } else console.log("같은 아이디 있어");
            return false;
          })
          .catch((error) => {
            console.log(error.res);
            Promise.reject(error); //에러 무시인데 400에러만 무시할수있도록? 수정? axios 안에서
            //일어난 일이니 상관 없을수도?
          });
        return promise; //여기가 true or false
      }),
    password: Yup.string()

      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
      ) //비밀번호 만들기 너무 빡셈....;;; 추후 회의떄 대 소문자는 물어보기
      .required("필수 정보입니다"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("필수 정보입니다"),

    loginId: Yup.string()
      .required("필수 정보입니다")
      .test("중복검사", "이미 사용중인 아이디 입니다", function (values) {
        const loginId = values;
        const promise = axios
          .get("http://localhost:8000/reg/me/loginId", {
            params: { loginId: loginId },
          })
          .then((res) => {
            console.log(res.data);
            if (!res.data) {
              console.log("같은 아이디 없어");
              return true;
            } else console.log("같은 아이디 있어");
            return false;
          })
          .catch((error) => {
            console.log(error.res);
            Promise.reject(error); //에러 무시인데 400에러만 무시할수있도록? 수정? axios 안에서
            //일어난 일이니 상관 없을수도?
          });
        return promise; //여기가 true or false
      }),

    phone: Yup.string()
      .required("필수 정보입니다")
      .matches(phoneRegExp, "번호를 확인해주세요"),
  });

  return (
    <Formik
      initialValues={{
        loginId: "",
        name: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        campus: "",
        language: "",
        mailAds: false,
        phone: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const {
          name,
          password,
          nickname,
          email,
          loginId,
          campus,
          language,
          phone,
          mailAds,
        } = values;
        console.log(values);
        console.log(values.password);
        axios
          .post(
            "http://localhost:8000/reg",
            {
              name,
              password,
              nickname,
              email,
              loginId,
              campus,
              language,
              phone,
              mailAds,
            },
            {
              headers: {
                "content-type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response);
            console.log("넘어감");
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }}
      // formik.setFieldTouched('email')
    >
      {(formik) => {
        const renderErrorMessage = (field) => {
          return (
            formik.touched[field] && (
              <div className="text-error">{formik.errors[field]}</div>
            )
          );
        };
        console.log("Formik props", formik);
        return (
          <div>
            <Form>
              <div id="wrapper">
                <div id="content">
                  <div>
                    <h3 className="join_title">
                      <label>이메일</label>
                    </h3>
                    <span className="box int_name">
                      <input
                        type="text"
                        className="int"
                        placeholder="example@naver.com"
                        {...formik.getFieldProps("email")}
                      />
                    </span>
                    {renderErrorMessage("email")}
                  </div>

                  <div>
                    <h3 className="join_title">
                      <label>아이디</label>
                    </h3>
                    <span className="box int_email">
                      <input
                        className="int"
                        placeholder="아이디"
                        type="text"
                        {...formik.getFieldProps("loginId")}
                      />
                    </span>
                    {renderErrorMessage("loginId")}
                  </div>

                  <div>
                    <h3 className="join_title">
                      <label>비밀번호</label>
                    </h3>
                    <span className="box int_pass">
                      <input
                        type="password"
                        className="int"
                        {...formik.getFieldProps("password")}
                        placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                      />
                    </span>
                    {renderErrorMessage("password")}
                  </div>

                  <div>
                    <h3 className="join_title">
                      <label>비밀번호 확인</label>
                    </h3>
                    <span className="box int_pass_check">
                      <input
                        type="password"
                        className="int"
                        {...formik.getFieldProps("confirmPassword")}
                        placeholder="비밀번호확인"
                      />
                    </span>
                    {renderErrorMessage("confirmPassword")}
                  </div>

                  <div>
                    <h3 className="join_title">
                      <label>닉네임</label>
                    </h3>
                    <span className="box int_mobile">
                      <input
                        type="text"
                        className="int"
                        placeholder="닉네임"
                        {...formik.getFieldProps("nickname")}
                      />
                    </span>
                    {renderErrorMessage("nickname")}
                  </div>
                  <div>
                    <h3 className="join_title">
                      <label>이름</label>
                    </h3>
                    <span className="box int_mobile">
                      <input
                        type="tel"
                        id="mobile"
                        className="int"
                        placeholder="이름"
                        {...formik.getFieldProps("name")}
                      />
                    </span>
                    {renderErrorMessage("name")}
                  </div>

                  <div>
                    <h3 className="join_title">
                      <label>교육기관</label>
                    </h3>
                    <span className="box int_mobile">
                      <input
                        type="text"
                        className="int"
                        placeholder="교육기관"
                        {...formik.getFieldProps("campus")}
                      />
                    </span>
                    {renderErrorMessage("campus")}
                  </div>

                  <div>
                    <h3 className="join_title">
                      <label>언어</label>
                    </h3>
                    <span className="box int_mobile">
                      <input
                        type="text"
                        className="int"
                        placeholder="언어"
                        {...formik.getFieldProps("language")}
                      />
                    </span>
                    {renderErrorMessage("language")}
                  </div>
                  <div>
                    <h3 className="join_title">
                      <label>전화번호</label>
                    </h3>
                    <span className="box int_mobile">
                      <input
                        type="text"
                        className="int"
                        placeholder="(-)숫자만 입력해주세요"
                        {...formik.getFieldProps("phone")}
                      />
                    </span>
                    {renderErrorMessage("phone")}
                  </div>
                  <div className="checkb">
                    <input
                      type="checkbox"
                      {...formik.getFieldProps("mailAds")}
                    />
                    메일 수신(이벤트 및 새로운 소식을 알려드립니다.)
                  </div>

                  <div className="btn_area">
                    <button
                      className="loginBtn registerWidth"
                      type="submit"
                      id="btnJoin"
                    >
                      <span>가입하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Registercopy;
