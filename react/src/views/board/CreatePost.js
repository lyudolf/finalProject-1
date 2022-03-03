import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./CreatePost.css";

//Formik에서 필드 네임은 데이터베이스에 들어갈 이름임.

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("글 제목을 입력해주세요!"),
    postText: Yup.string().required("본문 내용을 입력해주세요!"),
  });

  // 여기에 벡엔드 연결 해줘야 함
  const onSubmit = (data) => {
    axios.post("", data).then((response) => {
      console.log("글 작성에 성공하셨습니다.");
    });
  };

  return (
    <div className="createPost">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>글 제목: </label>
          <ErrorMessage name="title" component="span" />
          <Field autocomplete="off" id="inputCreatePost" name="title" />
          <label>본문: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="글 내용을 입력해주세요"
          />
          <div className="createPostBtn">
            <button type="submit">작성완료</button>

            {/* 작성취소 버튼은 기능 구현 해야함. */}
            <button type="submit">작성취소</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
