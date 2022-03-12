import React, { useState, useEffect } from "react";

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
        className="commentInputBox"
        type="text"
        autoComplete="off"
        autofocus
        value={updatedComment}
        onChange={(event) => {
          setUpdatedComment(event.target.value);
        }}
      ></input>
    </div>
  );
}

export default CommentList;
