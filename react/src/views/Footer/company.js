import React from "react";
import Chodaelogo from "../../assets/Chodae-logo.png"
import "./company.css";
function Company(){
    return(
        <div className="company">

            <div className="companyimage">
            <img src={Chodaelogo}></img>
            </div>
<div className="companycontent">
<h3>초보와 고수를 이어주는 소통창구</h3>

    <hr></hr>
   <h4>저희 '초대'는 갓 코딩에 입문한 신입개발자들을 위한 커뮤니티입니다.</h4>
    <h4>개발자들을 위한 커뮤니티로서 더욱더 발전해나가겠습니다!</h4>
</div>
        </div>
    )

} 
export default Company;