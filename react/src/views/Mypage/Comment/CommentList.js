import React, { useState, useEffect } from "react";

function CommentList({ updateReplyInReview, reply, sendComment,idindex }) {
  const [updatedComment, setUpdatedComment] = useState(reply.replyContent);

  useEffect(() => {
    if (sendComment) {
      updateReplyInReview(updatedComment, reply.replyNo , idindex);
    }
  }, [sendComment]);

  return (
    <div>
      <input
        className="commentInputBox"
        type="text"
        autoComplete="off"
        value={updatedComment}
        onChange={(event) => {
          setUpdatedComment(event.target.value);
        }}
      ></input>
    </div>
  );
}

export default CommentList;
