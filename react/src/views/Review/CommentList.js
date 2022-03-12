import React, { useState } from "react";

function CommentList({ updateReply, reply }) {
  const [updatedComment, setUpdatedComment] = useState(reply.replyContent);

  const handleUpdateReply = () => {
    updateReply(updatedComment, reply.replyNo);
  };

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
      <button onClick={handleUpdateReply}>수정2</button>
    </div>
  );
}

export default CommentList;