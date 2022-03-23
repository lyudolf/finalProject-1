import React from "react";

function TechTables({ e, moment, styles }) {
  return (
    <>
      <tr
        onClick={() => window.open(e.url, "_blank")}
        style={{ textAlign: "left", cursor: "pointer" }}
      >
        <td style={{ width: "10%" }}>
          <img
            className={styles.techImg}
            src={e.urlToImage}
            alt="techImg"
          ></img>
        </td>
        <td style={{ width: "30%" }}>{e.title.slice(0, 50)}...</td>
        <td style={{ width: "50%" }}>{e.description.slice(0, 80)}...</td>
        <td style={{ width: "10%", textAlign: "center" }}>
          {moment(e.publishedAt).format("l")}
        </td>
      </tr>
    </>
  );
}

export default TechTables;
