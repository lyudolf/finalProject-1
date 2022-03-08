import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from "../../plugins/axios";
import "./Post.css";
//아직 수정중인 파일임

function FaqPost() {
  const params = useParams();
  const postNo = params.postno;
  const location = useLocation();
  const navigate = useNavigate();

  const [postObject, setPostObject] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getPost(postNo);
    console.log(postNo);
    console.log(postObject);

  }, []);

  const getPost = function (postNo) {
    axios.get(`${location.pathname}`)
      .then((response) => {
        console.log(response.data)

        const post = response.data;
        post.postRegdate = dateFormat(new Date(post.postRegdate));

        for (const reply of post.replies) {
          reply.replyRegdate = dateFormat(new Date(reply.replyRegdate));
        }

        setPostObject(post);
        setComments(post.replies);
      })
      .catch((error) => { console.log(error) });
  };
  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
  };
  //댓글 추가 => 추가후 게시글 다시조회 댓글확인. 날짜 오름차순으로 출력,
  // 댓글도 닉네임으로 불러와야함.
  const addComment = async function () {

    const formData = new FormData();

    formData.append("content", "게시글 내용~~~");
    formData.append("nickname", "닉네임3");


    await axios.post(`${location.pathname}/reply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response.data)
    })
      .catch((error) => { console.log(error) });
  };
  //댓글 삭제

  //댓글 수정

  // const addComment = () => {
  //   const newReply = {
  //     id: localStorage.getItem("id"),
  //     replyContent: newComment,
  //     //작성자랑 댓글 내용만 벡엔드로 보내주면 됨.
  //   };
  //   const updatedPostObject = {
  //     ...postObject,
  //     replies: [...postObject.replies, newReply],
  //   };
  //   axios.put(`/carrer/${postno}`, updatedPostObject).then((response) => {
  //     setNewComment("");
  //     console.log(newReply);
  //     console.log("Comment added!");
  //   });
  //   setPostObject(updatedPostObject);
  // };

  return (
    <div className="postBody">
      <div className="postBox">


        <div>
          <div className="postHeader">
            {postObject !== null && postObject.category.map((category, index) => (
              <span className={"cate" + index}>#{category.categoryName} </span>
            ))}
            <span>
              {postObject !== null && <div>{postObject.nickname}</div>}
              {postObject !== null && <div>{postObject.postRegdate}</div>}
            </span>
          </div>

          <div className="postInfo">
            {postObject !== null && <span className="postTitle">{postObject.postTitle}</span>}
            <span>
              {postObject !== null && <div>조회수 : {postObject.postViews}</div>}
              {postObject !== null && <div>추천수 : {postObject.postLike}</div>}

            </span>
          </div>
        </div>

        <div className="postContent">
          <div>{postObject !== null && postObject.postContent.content}</div>
        </div>

        <div className="postReply">
          {postObject !== null && postObject.replies.map((reply) => (
            <div className="eachReply">

              <div>{reply.nickname}</div>
              <div className="regDate">{reply.replyRegdate}</div>

              <div className="replyContent">{reply.replyContent}</div>

            </div>
          ))}
        </div>


      </div>
    </div >
  );
}

export default FaqPost;
