import logo from './logo192.png';
import React from "react";

import Start from "./Start";
import Quiz from "./Quiz";
import Score from "./Score";

class App extends React.Component {
    constructor(props) {
        super(props);
        // state에 필요한 데이터를 넣어줘요!
        this.state = {
            name: "개발적합도",
            page: "quiz",
            scoreMsg: "직무에 어울립니다 :)",
            list: [
                { question: "자바는 객체지향언어다.", answer: "X" },
                { question: "quiz2", answer: "O" },
                { question: "quiz3", answer: "O" },
                { question: "quiz4", answer: "O" },
                { question: "quiz5", answer: "O" },
                { question: "quiz6", answer: "O" },
                { question: "quiz7", answer: "O" },
                { question: "quiz8", answer: "X" },
                { question: "quiz9", answer: "O" },
                { question: "quiz10", answer: "O" },
                { question: "quiz11", answer: "O" },
            ],
            ranking: [
                { rank: 1, name: "이현주", message: "1" },
                { rank: 2, name: "이현주", message: "2" },
                { rank: 3, name: "이현주", message: "3" },
                { rank: 4, name: "이현주", message: "4" },
                { rank: 5, name: "이현주", message: "5" },
                { rank: 6, name: "이현주", message: "6" },
                { rank: 7, name: "이현주", message: "7" },
            ],
        };
    }

    render() {
        return (
            <div className="App">
                {/* 조건부 랜더링을 합니다 / state의 page를 바꿔가면서 확인 */}
                {this.state.page === "quiz" && (<Quiz list={this.state.list} />)}
                {this.state.page === "start" && (<Start name={this.state.name} />)}
                {this.state.page === "score" && (<Score name={this.state.name} scoreMsg={this.state.scoreMsg} />)}
            </div>
        );
    }
}

export default App;