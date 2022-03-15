import React from "react";
import "./CarrerBoardTable.css";

function CareerBoardTable({ tableData, moment }) {
  const { id, nickname, postLike, postViews, postRegdate, postContent, postTitle, category, name } =
    tableData;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={5}>
              <div className="postCategory">
                {category !== null && category.map((category, index) => (
                  <span key={category.categoryName + index} className={"cate" + index}>#{category.categoryName} </span>
                ))}
              </div>
            </th>

          </tr>
          <tr>
            <th className="postTitle" colSpan={5}>
              {postTitle}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>작성자: {nickname}</td>
            <td>조회수: {postViews}</td>
            <td>추천수: {postLike}</td>
            <td>작성일: {moment(postRegdate).format("l")}</td>
          </tr>
          <tr>
            {name !== null && name.map((name, i) => (
              <td key={i}>
                <img className="miss" src={`http://localhost:8000/get/image/${name.name}`} width="20%" alt="이미지" />
              </td>))}
          </tr>
          <tr>
            <td className="postContent" colSpan={5}>
              {postContent.content}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default CareerBoardTable;
