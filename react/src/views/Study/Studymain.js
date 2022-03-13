import React,{useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import data from './data';
import './Studymain.css';


function Study() {

   let [imagedata,setimagedata] = useState([data]);

    return(
    <div className="StudyMain">
        <div className="SubStudy">
            <h3>스터디 모집</h3>
            <hr/>
            <div className='container'>
                <div className='row'>
<StudyCard/>
                </div>
            </div>

<button> <Link to = "/studytext">모집글작성</Link></button>
        </div>
    </div>
    );
}
function StudyCard() {
   
    return(
        <div className='Card'>
<button>
<h1>{data[0].title}</h1>
<h3><img src= {data[0].image}></img></h3>
<h3>사용언어 : {data[0].uselanguage}</h3>
</button>

        </div>
    )
}
export default Study;