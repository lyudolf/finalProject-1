import React, { useState, useEffect } from "react";
import styles from "../views/forget/FaqPost.module.css";

function CommentList({ updateReply, reply, sendComment }) {
  const [updatedComment, setUpdatedComment] = useState(reply.replyContent);

  useEffect(() => {
    if (sendComment) {
      updateReply(updatedComment, reply.replyNo);
    }
  }, [sendComment]);

  return (
    <div>
      <input
        className={styles.commentInputBox}
        type="text"
        autoComplete="off"
        autoFocus
        value={updatedComment}
        onChange={(event) => {
          setUpdatedComment(event.target.value);
        }}
      ></input>
    </div>
  );
}

export default CommentList;
