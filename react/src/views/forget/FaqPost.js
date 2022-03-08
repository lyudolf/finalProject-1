import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "../../plugins/axios";
import "./Post.css";
import CareerBoardTable from "../../component/CareerBoardTable";
import moment from "moment"; //날짜 수정하기 위해 모멘트 설치

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
    console.log(location);
  }, []);

  const getPost = function (postNo) {
    axios
      .get(`${location.pathname}`)
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
    formData.append("nickname", "닉네임3");


    await axios
      .post(`${location.pathname}/reply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //댓글 삭제
  const deleteReply = async function (replyNo) {
    // const formData = new FormData();
    // formData.append("nickname", "닉네임3");
    // console.log(replyNo);
    // for (var key of formData.keys()) {
    //   console.log(key);
    // }

    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    await axios({
      method: "DELETE",
      url: `${location.pathname}/reply/${replyNo}/닉네임3`,
    }).then(() => {
      setComments(
        comments.filter((val) => {
          return val.replyNo !== replyNo;
        })
      );
    });
  };

  //   await axios
  //     .delete(`${location.pathname}/reply/${replyNo}`, {
  //       data: { nickname: "닉네임3" },
  //     })
  //     .then(() => {
  //       setComments(
  //         comments.filter((val) => {
  //           return val.replyNo !== replyNo;
  //         })
  //       );
  //     });
  // };

  //댓글 수정 -> 수정 안되고 추가가 됨;;;
  // const updateReply = async function (replyNo) {
  //   const formData = new FormData();
  //   formData.append("nickname", "닉네임3");
  //   formData.append("content", "댓글내용임");

  //   await axios
  //     .put(`${location.pathname}/reply/${replyNo}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

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

  //추천 버튼 함수   //게시글 추천 //댓글 추천
  const likePost = (type, targetNo) => {


    console.log(location);
    const idx = location.pathname.indexOf("/", 1);
    console.log(idx);
    const boardName = location.pathname.slice(1, idx);
    console.log(boardName); //faq



    // axios.post(`/career/recomm/${type}/{targetNo}`)
  }
  //추천 추가 ---- 추천 취소 토글 버튼

  return (
    <div className="postContainer">
      {postObject && (
        <div className="postSection">
          <CareerBoardTable moment={moment} tableData={postObject} />


          {postObject !== null ?
            <div className="recommend">   아이콘 색칠 유저가 해당글을 이미 추천함</div>
            :
            <div className="notRecommend"> 아이콘 회색 추천아직</div>}

          <div className="listOfComments">
            {postObject != null &&
              postObject.replies.map((reply, index) => {
                return (
                  <div className="comment" key={index}>
                    <div className="commentNickname">{reply.nickname}</div>
                    <div>{reply.replyContent}</div>
                    <span className="commentTime">
                      {moment(reply.replyRegdate).format("LLL")}
                    </span>
                    <span>
                      {localStorage.getItem("user") === reply.nickname && (
                        <div>
                          <button
                            onClick={() => {
                              deleteReply(reply.replyNo);
                            }}
                          >
                            삭제
                          </button>
                          {/* <button
                         onClick={() => {
                           updateReply(reply.replyNo);
                         }}
                       >
                         수정
                       </button> */}
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
              likePost(postObject.postNo);
            }}
          >
            Like
          </button>
        </div>
      )}
    </div>
  );
}

export default FaqPost;
