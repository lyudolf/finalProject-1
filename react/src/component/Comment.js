import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import styles from "../views/forget/FaqPost.module.css";

function Comment({ props, reply }) {
  const [replyRecommendOrNot, setReplyRecommendOrNot] = useState(false);
  const { addLike, deleteLike, nickname } = props;

  return (
    <div className={styles.replyRecommendContainer}>
      {!replyRecommendOrNot ? (
        <FaThumbsUp
          className={styles.replyRecommend}
          onClick={() => {
            addLike("reply", reply.replyNo, nickname);
            setReplyRecommendOrNot(!replyRecommendOrNot);
          }}
        />
      ) : (
        <FaThumbsUp
          className={styles.replyNotRecommend}
          onClick={() => {
            deleteLike("reply", reply.replyNo, nickname);
            setReplyRecommendOrNot(!replyRecommendOrNot);
          }}
        />
      )}
    </div>
  );
}

export default Comment;
