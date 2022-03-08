import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
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
  // 댓글 추가후 추가 된 댓글 새로고침없이 확인가능? 
  // 댓글도 닉네임으로 불러와야함.
  const addComment = async function () {

    const formData = new FormData();

    formData.append("content", newComment);
    formData.append("nickname", "닉네임3");


    await axios.post(`${location.pathname}/reply`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log(response.data)
      setNewComment("");
    })
      .catch((error) => { console.log(error) });
  };

  //댓글 삭제 함수
  const deleteReply = (id) => {
    const { replyNo } = parseInt(id);
    const formData = new FormData();
    formData.append("nickname", "닉네임");

    axios
      .delete(`${location.pathname}/reply/{replyNo}`, formData, {
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
                      {localStorage.getItem("user") === comment.id && (
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
              likePost(postObject.postNo);
            }}
          >
            Like
          </button>
        </div>
      )}
    </div>
    // <div className="postBody">
    //   <div className="postBox">


    //     <div>
    //       <div className="postHeader">
    //         {postObject !== null && postObject.category.map((category, index) => (
    //           <span className={"cate" + index}>#{category.categoryName} </span>
    //         ))}
    //         <span>
    //           {postObject !== null && <div>{postObject.nickname}</div>}
    //           {postObject !== null && <div>{postObject.postRegdate}</div>}
    //         </span>
    //       </div>

    //       <div className="postInfo">
    //         {postObject !== null && <span className="postTitle">{postObject.postTitle}</span>}
    //         <span>
    //           {postObject !== null && <div>조회수 : {postObject.postViews}</div>}
    //           {postObject !== null && <div>추천수 : {postObject.postLike}</div>}

    //         </span>
    //       </div>
    //     </div>

    //     <div className="postContent">
    //       <div>{postObject !== null && postObject.postContent.content}</div>
    //     </div>

    //     <div className="postReply">
    //       {postObject !== null && postObject.replies.map((reply) => (
    //         <div className="eachReply">

    //           <div>{reply.nickname}</div>
    //           <div className="regDate">{reply.replyRegdate}</div>

    //           <div className="replyContent">{reply.replyContent}</div>

    //         </div>
    //       ))}
    //     </div>


    //   </div>
    // </div >
  );
}

export default FaqPost;
