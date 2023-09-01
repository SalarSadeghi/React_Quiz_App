import { useState } from "react";
import "./app.scss";
import { moneyPyramid,  getQuestion } from "./data";
import Trivia from "./components/trivia/Trivia";
import Timer from "./components/timer/Timer";
import Start from "./components/start/Start";
import { useEffect } from "react";

function App() {
  const [quastionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [username, setUsername] = useState(null);
  const [dangerTime, setDangerTime] = useState(false)
  const [data, setData] = useState()
  const handleEarned = (level) => {
    setEarned(moneyPyramid[15 - level].amount);
  };
  useEffect(()=>{
    getQuestion(setData)
  },[setData])
  console.log(data);
  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">{username}, you won {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className={dangerTime ? "timer danger" : "timer"}>
                    <Timer setStop={setStop} quastionNumber={quastionNumber} setDangerTime={setDangerTime} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                    quastionNumber={quastionNumber}
                    handleEarned={handleEarned}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    quastionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={m.id}
                >
                  <span className="moneyListItemNumber">Q. {m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername}/>
      )}
    </div>
  );
}

export default App;
