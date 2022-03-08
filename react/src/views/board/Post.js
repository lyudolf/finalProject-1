import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../plugins/axios";
import "./Post.css";
import CareerBoardTable from "../../component/CareerBoardTable";
//테이블 컴포넌트로 만들어서 따로 뺴놨음
import moment from "moment";
//날짜 수정하기 위해 모멘트 설치 yarn add moment 하면됨

function Post() {
  let { postno } = useParams();
  const [postObject, setPostObject] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchDataObject = async () => {
      try {
        const { data } = await axios.get(`/career/${postno}`);
        setPostObject(data);
        setComments(data.replies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataObject();
  }, []);

  //문제는 페이지를 새로고침해야 추가된 댓글이 보임.....
  //댓글 추가 함수
  const addComment = () => {
    const formData = new FormData();
    formData.append("content", newComment);
    formData.append("nickname", "닉네임");

    axios
      .post(`/career/${postno}/reply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setNewComment("");
      });
  };

  //댓글 삭제 함수
  const deleteReply = (id) => {
    const { replyNo } = parseInt(id);
    const formData = new FormData();
    formData.append("nickname", "닉네임");

    axios
      .delete(`/career/{postno}/reply/{replyNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  //추천 버튼 함수
  const likeAPost = (postNo) => {
    axios.post(`/career/recomm/post/{targetNo}`)
  }

  return (
    <div className="postContainer">
      {postObject && (
        <div className="postSection">
          <CareerBoardTable moment={moment} tableData={postObject} />

          <div className="listOfComments">
            {comments &&
              comments.map((comment, index) => {
                return (
                  <div className="comment" key={index}>
                    <div className="commentNickname">{comment.id}</div>
                    <div>{comment.replyContent}</div>
                    <span className="commentTime">
                      {moment(comment.replyRegdate).format("LLL")}
                    </span>
                    <span>
                      {localStorage.getItem("user") == comment.id && (
                        <button
                          onClick={() => {
                            deleteReply(comment.id);
                          }}
                        >
                          삭제
                        </button>
                      )}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="commentSection">
            <div className="commentNickname">
              {localStorage.getItem("user")}
            </div>
            <input
              className="commentInputBox"
              type="text"
              placeholder="댓글을 남겨보세요"
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            ></input>
            <button
              className="commentAddBtn"
              onClick={() => {
                addComment();
              }}
            >
              등록
            </button>
          </div>
          <button
            onClick={() => {
              // likeApost(postObject.postNo);
            }}
          >
            Like
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
