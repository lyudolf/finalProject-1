import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "../../plugins/axios";
import "./ReviewComment.css";

import moment from "moment"; //날짜 수정하기 위해 모멘트 설치
import CommentList from "./CommentList"; //댓글 수정하면 나오는 입력창



function ReviewComment(indexObject) {



  const ReviewIndex = indexObject.id;// {id: index}
  console.log("REVUEWCOMMENT" + indexObject.id);

  const [postObject, setPostObject] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  const [sendComment, setSendComment] = useState(false);

  useEffect(() => {
    getPost(ReviewIndex);
  }, []);

  const getPost = function (ReviewIndex) {
    axios
      .get(`/review/index/${ReviewIndex}`)
      .then((response) => {
        console.log(response.data);

        const post = response.data;
        post.postRegdate = dateFormat(new Date(post.postRegdate));

        for (const reply of post.replies) {
          reply.replyRegdate = dateFormat(new Date(reply.replyRegdate));
        }

        setPostObject(post);
        setComments(post.replies);
      })
      .catch((error) => {
        console.log(error);
      });
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
  }

  //댓글 추가 => 추가후 게시글 다시조회 댓글확인. 날짜 오름차순으로 출력,
  // 댓글 추가후 추가 된 댓글 새로고침없이 확인가능?
  // 댓글도 닉네임으로 불러와야함.
  const addComment = async function () {
    const formData = new FormData();

    formData.append("content", newComment);
    formData.append("nickname", "닉네임51");

    await axios
      .post(`/review/reply/${ReviewIndex}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //댓글 삭제
  const deleteReply = async function (postNo, replyNo) {
    await axios({
      method: "DELETE",
      url: `/review/post/${postNo}/reply/${replyNo}/닉네임51`,
    }).then(() => {
      setComments(
        comments.filter((val) => {
          return val.replyNo !== replyNo;

        })
      );

    });
  };

  //댓글 수정
  const updateReplyInReview = async function (content, replyNo, ReviewIndex) {
    const formData = new FormData();
    formData.append("nickname", "닉네임51");
    formData.append("content", content)
    await axios
      .put(`/review/index/${ReviewIndex}/reply/${replyNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      });
  };

  const nickname = "닉네임51";


  return (
    <div className="postContainer">
      {postObject && (
        <div className="postSection">

          <div className="listOfComments">
            {postObject != null &&
              postObject.replies.map((reply, index) => {
                return (
                  <div className="comment" key={index}>
                    <div className="commentNickname">{reply.nickname}</div>
                    {updateClicked === true ? (
                      <CommentList
                        sendComment={sendComment}
                        updateReplyInReview={updateReplyInReview}
                        reply={reply}
                        index={ReviewIndex}
                      />
                    ) : (
                      <div>{reply.replyContent}</div>
                    )}
                    <span className="commentTime">
                      {moment(reply.replyRegdate).format("LLL")}
                    </span>
                    <span>
                      {localStorage.getItem("user") === reply.nickname && (
                        <div className="commentAddBtnWrapper">
                          <button
                            className="commentAddBtn"
                            onClick={() => {
                              setUpdateClicked(!updateClicked);
                            }}
                          >
                            {updateClicked ? "취소" : "수정"}
                          </button>
                          {updateClicked ? (
                            <button
                              className="commentAddBtn"
                              onClick={() => {
                                setSendComment(true);
                              }}
                            >
                              수정
                            </button>
                          ) : (
                            <button
                              className="commentAddBtn"
                              onClick={() => {
                                deleteReply(postObject.postNo, reply.replyNo);

                              }}
                            >
                              삭제
                            </button>
                          )}
                        </div>
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
            <div className="commentInputWrapper">
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
              <div className="commentAddBtnWrapper">
                <button
                  className="commentAddBtn"
                  onClick={() => {
                    addComment();
                  }}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewComment;
