import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../../plugins/axios';
import JsonData from "./MOCK_DATA.json";
import "./Post.css";

function Post() {
  let { postno } = useParams();
  const [postObject, setPostObject] = useState(
    JsonData.find((post) => post.postNo === parseInt(postno))
  );

  //find함수 는 array에서 자료 찾을 떄 사용 가능

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  console.log(postObject);
  useEffect(() => {
    // post를 가져오는 api
    axios.get(`/carrer/${postno}`).then((response) => {
      setPostObject(response.data);
      setComments(postObject.replies);
    });
  });

  const addComment = () => {
    const newReply = {
      id: localStorage.getItem("id"),
      replyContent: newComment,
      //작성자랑 댓글 내용만 벡엔드로 보내주면 됨.
    };
    const updatedPostObject = {
      ...postObject,
      replies: [...postObject.replies, newReply],
    };
    axios.put(`/carrer/${postno}`, updatedPostObject).then((response) => {
      setNewComment("");
      console.log(newReply);
      console.log("Comment added!");
    });
    setPostObject(updatedPostObject);
  };

  return (
    <div className="postContainer">
      <div className="postSection">
        <table>
          <tr>
            <td className="postTitle" colSpan={4}>
              {postObject.postTitle}
            </td>
          </tr>
          <tr>
            <td>작성자명: {postObject.id}</td>
            <td>추천수: {postObject.postLike}</td>
            <td>조회수: {postObject.postViews}</td>
            <td>작성일: {postObject.postRegdate}</td>
          </tr>
          <tr>
            <td colSpan={5}>{postObject.postContent.content}</td>
          </tr>
        </table>
        <div className="commentSection">
          <input
            type="text"
            placeholder="Comment"
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              if (
                localStorage.getItem("email") &&
                localStorage.getItem("name") &&
                localStorage.getItem("id")
              ) {
                addComment();
              } else {
                alert("You need be logged in");
              }
            }}
          >
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {postObject.replies.map((comment) => {
            return <div className="comment">{comment.replyContent}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
