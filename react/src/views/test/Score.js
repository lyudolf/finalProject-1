import React from "react";
import styled from "styled-components";
 
const Score = (props) => {

  return (
    <ScoreContainer>
      
        <Text>
          <span>{props.name}</span>
          퀴즈에 <br />
          대한 내 점수는?
        </Text>
        <MyScore>
          <span>100</span>점
          <p>{props.scoreMsg}</p>
        </MyScore>
 
        {/* <Button>다시 하기</Button> */}
        <Button outlined>랭킹보기</Button>
      
    </ScoreContainer>
  );
};
 
const ScoreContainer = styled.div`
display:flex;
width: 100vw;
height: 100vh;
overflow: hidden;
padding: 16px;
box-sizing: border-box;
flex-direction: column;
justify-content: center;
align-items: center;
`;
 
const Text = styled.h1`
font-size: 1.5em;
margin: 0px;
line-height: 1.4;
& span {
    background-color: #fef5d4;
    padding: 5px 10px;
    border-radius: 30px;
}`;
 
const MyScore = styled.div`
  & span {
    border-radius: 30px;
    padding: 5px 10px;
    background-color: #fef5d4;
  }
  font-weight: 600;
  font-size: 2em;
  margin: 24px;
 
  & > p{
      margin: 24px 0px;
      font-size: 16px;
      font-weight: 400;
  }
`;
const Button = styled.button`
  padding: 8px 24px;
  background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
  border-radius: 30px;
  margin: 8px;
  border: 1px solid #dadafc;
  width: 80vw;
`;
 
export default Score;
