import styles from "./MenuBar.module.css";
import { Link } from "react-router-dom";
// import styles from "./Header.module.css";

function MenuBar() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Link className={styles.menuLink} to="/together/study">
            스터디모집
          </Link>
          <ul>
            <li>
              <Link className={styles.menuLink} to="#">
                간이테스트
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="#">
                지역별 검색
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="#">
                맞춤형 검색
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link className={styles.menuLink} to="/reviewmain">
            국비교육
          </Link>
          <ul>
            <li>
              <Link className={styles.menuLink} to="/reviewmain">
                기관검색
              </Link>
            </li>
          </ul>
        </li>

        <li>

          <Link className={styles.menuLink} to="/latestposts">
            게시판
          </Link>
          <ul>
            <li>
              <Link className={styles.menuLink} to="/mainboard/book">
                리뷰게시판
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="/mainboard/worry">
                고민상담게시판
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="/mainboard/career">
                취업준비게시판
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="/mainboard/technews">
                IT게시판
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link className={styles.menuLink} to="#">
            이벤트
          </Link>
          <ul>
            <li>
              <Link className={styles.menuLink} to="#">
                코딩대회 일정
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="#">
                취업박람회 일정
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="#">
                심리테스트
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link className={styles.menuLink} to="/customer/faq">
            고객센터
          </Link>
          <ul>
            <li>
              <Link className={styles.menuLink} to="/customer/notice">
                공지사항
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} to="/customer/faq">
                자주하는 질문
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default MenuBar;
