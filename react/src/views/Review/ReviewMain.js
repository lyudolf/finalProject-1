/*eslint-disable */
import React,{useState} from 'react';

import { Link } from 'react-router-dom';


import './ReviewMain.css' ;
import axios from 'axios';


function ReviewMain(props){

  let shoes = props.shoes;
  let shoes1 = props.shoes1;

  return(
    
<div className='main'>
<div className='headline'>
  <h3>기관검색</h3>
  <hr/>
  </div>
   <div className='container'>
    <div className='row'>
      {
        shoes.map((a,i)=>{
          return <Card shoes={shoes[i]}  i ={i} key={i}/>
        })
      }     
    </div>
     </div>
     <button className='btn btn-primary' onClick={()=>{
      //axios.post('서버url',{id:'멀티캠퍼스',pw:'1234'}).then()

       axios.get('https://raw.githubusercontent.com/9598dohyun/image/main/data2.json')
     .then((result)=>{  //.then 은 ajax가 성공했을때 나오는 코드
      
      shoes1([...shoes,...result.data]);//[...shoes] 슈즈를 벗기고 다시 [] 로 감싸는 복사본
     console.log(result.data);
     console.log([...shoes,...result.data]);
    })
     .catch(()=>{ 
    console.log('실패')})
     }}>더보기</button>
  </div>
  )
}
function Card(props){
  
  return(
    
      <div className="col-md-4" >
        
     <button><Link to={"/detail/"+(props.i)} > <img src= {"https://github.com/9598dohyun/image/blob/main/academyphoto/photo"+(props.i)+".png?raw=true"} width="100%" alt="이미지">
     
         </img> </Link></button>
        <h4>{props.shoes.title}</h4>        
        </div>     
  )
}
export default ReviewMain;