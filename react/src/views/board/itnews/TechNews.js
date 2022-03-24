import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import styles from "./TechNews.module.css";
import TechTables from "./TechTable";
import TechSearchBar from "./TechSearchBar";

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
    <div className={styles.newsContainer}>
      <div className={styles.techNewsHeading}>IT News 게시판</div>
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
                return <TechTables e={e} styles={styles} moment={moment} />;
              })}
          </tbody>
        </table>
      )}
      <div className={styles.paginationContainer}>
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={styles.paginationBttns}
          previousLinkClassName={styles.previousBttn}
          nextLinkClassName={styles.nextBttn}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
      </div>

      {/* <TechSearchBar searchText={searchText} setSearchText={setSearchText} /> */}

      <div style={{ margin: "20px" }}></div>
      {/* <TechSearchBar /> */}
    </div>
  );
}

export default TechNews;
