import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../../plugins/axios";
import * as Yup from "yup";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

//Formik에서 필드 네임은 데이터베이스에 들어갈 이름임.

function CreatePost() {
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    content: "",
    nickname: localStorage.getItem("user"),
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("글 제목을 입력해주세요!"),
    content: Yup.string().required("본문 내용을 입력해주세요!"),
  });

  //400번 에러 타이틀을 찾을 수 없다고 함.
  const submitPost = (data) => {
    console.log(data);
    axios
      .post("/career", data)
      .then((response) => {
        navigate("/careerboard");
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="createPost">
      <Formik
        initialValues={initialValues}
        onSubmit={submitPost}
        validationSchema={validationSchema}
      >
        <Form className="createPostformContainer">
          <label>글 제목: </label>
          <ErrorMessage
            name="title"
            component="span"
            className="createPostErr"
          />
          <Field autocomplete="off" className="titleField" name="title" />
          <label>본문: </label>
          <ErrorMessage
            name="content"
            component="span"
            className="createPostErr"
          />
          <Field
            autocomplete="off"
            name="content"
            component="textarea"
            placeholder="글 내용을 입력해주세요"
            className="bodyField"
          />
          <div className="postSubmitBtnWrapper">
            <button className="postSubmitBtn" type="submit">
              작성완료
            </button>

            {/* 작성취소 버튼은 기능 구현 해야함. */}
            {/* <button type="submit">작성취소 Cancel</button> */}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
