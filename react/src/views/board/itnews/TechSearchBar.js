// import React from "react";
// import styles from "./TechSearchBar.module.css";

// function TechSearchBar({ searchText, setSearchText }) {
//   return (
//     <div className={styles.searchBarContainer}>
//       <select
//         className={styles.searchBarDrowdown}
//         value={searchBy}
//         onChange={(event) => setSearchBy(event.target.value)}
//       >
//         <option value="titleOrContent">제목+내용</option>
//         <option value="title">제목</option>
//         <option value="content">내용</option>
//       </select>
//       <input
//         className={styles.searchBarInput}
//         type="text"
//         value={searchText}
//         placeholder="검색어를 입력해주세요"
//         onChange={(event) => {
//           setSearchText(event.target.value);
//         }}
//       />
//       <button className={styles.searchBarInputBtn} onClick={onClick}>
//         Search
//       </button>
//     </div>
//   );
// }

// export default TechSearchBar;
