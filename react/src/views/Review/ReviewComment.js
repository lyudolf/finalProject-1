import React, { useEffect, useState } from "react";

import axios from "../../plugins/axios";
import "./ReviewComment.css";

import moment from "moment"; //날짜 수정하기 위해 모멘트 설치
import CommentList from "./CommentList"; //댓글 수정하면 나오는 입력창
import useStore from "../../plugins/store";
function ReviewComment(id) {
  const idindex = id;
  const store = useStore();
  const nickname =
    useStore.getState().member !== null
      ? useStore.getState().member.nickname
      : null;
  const loginId =
    useStore.getState().member !== null
      ? useStore.getState().member.loginId
      : null;
  const [postObject, setPostObject] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  const [sendComment, setSendComment] = useState(false);

  useEffect(() => {
    getPost(idindex.id);
  }, []);

  const getPost = function (idindex) {
    axios
      .get(`/review/index/${idindex}`)
      .then((response) => {
        // console.log(response.data);

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
    formData.append("nickname", nickname);

    await axios
      .post(`/review/reply/${idindex.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //댓글 삭제
  const deleteReply = async function (postNo, replyNo) {
    console.log(replyNo, idindex);
    await axios({
      method: "DELETE",
      url: `/review/post/${postNo}/reply/${replyNo}/닉네임51`,
    }).then(() => {
      window.location.reload();
      setComments(
        comments.filter((val) => {
          return val.replyNo !== replyNo;
        })
      );
    });
  };

  //댓글 수정
  const updateReplyInReview = async function (content, replyNo, idindex) {
    const formData = new FormData();
    formData.append("index", idindex);
    formData.append("nickname", nickname);
    formData.append("content", content);
    console.log(replyNo, idindex);
    await axios
      .put(`/review/index/${idindex}/reply/${replyNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      });
  };



  return (
    <div className="postContainer1">
      {postObject && (
        <div className="postSection1">
          <div className="listOfComments1">
            {postObject != null &&
              postObject.replies.map((reply, index) => {
                return (
                  <div className="comment1" key={index}>
                    <div className="commentNickname1">{reply.nickname}</div>
                    {updateClicked === true ? (
                      <CommentList
                        sendComment={sendComment}
                        updateReplyInReview={updateReplyInReview}
                        reply={reply}
                        idindex={idindex.id}
                      />
                    ) : (
                      <div>{reply.replyContent}</div>
                    )}
                    <span className="commentTime1">
                      {moment(reply.replyRegdate).format("LLL")}
                    </span>
                    <span>
                      {localStorage.getItem("username") === reply.nickname && (
                        <div className="commentAddBtnWrapper1">
                          <button
                            className="commentAddBtn1"
                            onClick={() => {
                              setUpdateClicked(!updateClicked);
                            }}
                          >
                            {updateClicked ? "취소" : "수정"}
                          </button>
                          {updateClicked ? (
                            <button
                              className="commentAddBtn1"
                              onClick={() => {
                                setSendComment(true);
                              }}
                            >
                              수정
                            </button>
                          ) : (
                            <button
                              className="commentAddBtn1"
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

          <div className="commentSection1">
            <div className="commentNickname1">
              {localStorage.getItem("user")}
            </div>
            <div className="commentInputWrapper1">
              <input
                className="commentInputBox1"
                type="text"
                placeholder="댓글을 남겨보세요"
                autoComplete="off"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              ></input>
              <div className="commentAddBtnWrapper1">
                <button
                  className="commentAddBtn1"
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
