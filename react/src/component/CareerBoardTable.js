import React from "react";

function CareerBoardTable({ tableData, moment }) {
  const { id, postLike, postViews, postRegdate, postContent, postTitle } =
    tableData;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="postTitle" colSpan={5}>
              {postTitle}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>작성자: {id}</td>
            <td>추천수: {postLike}</td>
            <td>조회수: {postViews}</td>
            <td>작성일: {moment(postRegdate).format("l")}</td>
          </tr>
          <tr>
            <td colSpan={5}>{postContent.content}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default CareerBoardTable;
