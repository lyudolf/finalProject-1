import React, { useEffect, useState } from "react";
import axios from "axios";
//searchBar 새로 만들어야함
import SearchBar from "../SearchBar";
import moment from "moment";

function ITNews() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=f8e9dfcd44e64c4d965a292e3fb608df`
      )
      .then((response) => {
        console.log(response);
        setNewsData(response.data.articles);
      });
  }, []);

  useEffect(() => console.log(newsData), [newsData]);

  return (
    <>
      {newsData && (
        //css 수정 필요
        <table
          style={{ width: "80%", margin: "auto", border: "2px solid black" }}
        >
          <thead>
            <tr>
              <th className="postTitle">제목</th>
              <th className="postTitle">내용</th>
              <th className="postTitle">일자</th>
            </tr>
          </thead>
          <tbody>
            {newsData.map((e) => {
              return (
                <tr style={{ textAlign: "left" }}>
                  <td>{e.title}</td>
                  <td>{e.description}...</td>
                  <td>{moment(e.publishedAt).format("l")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <SearchBar />
    </>
  );
}

export default ITNews;
