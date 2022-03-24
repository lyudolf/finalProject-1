import React from "react";
import styled from "styled-components";
import img from "./logo192.png";
import TinderCard from "react-tinder-card";
import {useNavigate} from "react-router-dom"
import Score from "./Score";

const Quiz = (props) => {
  console.log(props);
  // state로 관리
  const [num, setNum] = React.useState(0);
  const navigate = useNavigate();
 
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    setNum(num + 1);
  };
 
  if (num > 10) {
    return navigate("/Score");

  }
 
  return (
    <QuizContainer>
      <p>
        <span>{num + 1}번 문제</span>
      </p>
      {props.list.map((l, idx) => {
        if (num === idx) {
            // props의 list에 있는 question의 값들을 순서대로 불러온다.
          return <Question key={idx}>{l.question}</Question>;
        }
      })}
 
      <AnswerZone>
        <Answer>{"O "}</Answer>
        <Answer>{" X"}</Answer>
      </AnswerZone>
 
      {props.list.map((l, idx) => {
        if (idx === num) {
          return (
            <DragItem key={idx}>
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={onSwipe}
                onCardRightScreen={onSwipe}
                preventSwipe={["up", "down"]}
              >
                <img src={img} />
              </TinderCard>
            </DragItem>
          );
        }
      })}
    </QuizContainer>
  );
};
  
const QuizContainer = styled.div`
& > p > span {
  padding: 8px 16px;
  background-color: #fef5d4;
  // border-bottom: 3px solid #ffd6aa;
  border-radius: 30px;
}
`;

const Question = styled.h1`
font-size: 1.5em;
`;

const AnswerZone = styled.div`
width: 100%;
display: flex;
flex-direction: row;
min-height: 70vh;
`;

const Answer = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
font-size: 100px;
font-weight: 600;
color: #dadafc77;
`;

const DragItem = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;

& > div {
  border-radius: 500px;
  background-color: #ffd6aa;
}
& img {
  max-width: 150px;
}
`;
export default Quiz;
