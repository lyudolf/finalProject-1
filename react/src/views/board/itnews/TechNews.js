import React, { useEffect, useState } from "react";
import axios from "axios";
//searchBar 새로 만들어야함
import SearchBar from "../SearchBar";
import moment from "moment";
import "./TechNews.css";
import ReactPaginate from "react-paginate";

function TechNews() {
  const [newsData, setNewsData] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const newsDataPerPage = 10;
  const pagesVisited = pageNumber * newsDataPerPage;

  const pageCount = Math.ceil(newsData.length / newsDataPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
    <div className="newsContainer">
      <div className="techNewsHeading">IT News 게시판</div>
      {newsData && (
        <table>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ width: "10%" }}></th>
              <th style={{ width: "30%" }}>제목</th>
              <th style={{ width: "50%" }}>내용</th>
              <th style={{ width: "10%" }}>일자</th>
            </tr>
          </thead>
          <tbody>
            {newsData
              .slice(pagesVisited, pagesVisited + newsDataPerPage)
              .map((e) => {
                return (
                  <tr style={{ textAlign: "left" }}>
                    <td style={{ width: "10%" }}>
                      <img className="techImg" src={e.urlToImage}></img>
                    </td>
                    <td style={{ width: "30%" }}>{e.title.slice(0, 50)}...</td>
                    <td style={{ width: "50%" }}>
                      {e.description.slice(0, 80)}...
                    </td>
                    <td style={{ width: "10%", textAlign: "center" }}>
                      {moment(e.publishedAt).format("l")}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
      <SearchBar />
      <div style={{ margin: "20px" }}></div>
    </div>
  );
}

export default TechNews;
