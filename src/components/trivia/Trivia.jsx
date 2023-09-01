import { useEffect, useState } from "react";
import "./trivia.scss";
import useSound from "use-sound";
import correct from "../../sounds/correct.wav";
import wrong from "../../sounds/wrong.wav";
import play from "../../sounds/play.wav";

function Trivia({
  data,
  setQuestionNumber,
  setStop,
  quastionNumber,
  handleEarned,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);



  useEffect(() => {
    setQuestion(data[quastionNumber - 1]);
  }, [data, quastionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, [duration]);
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(answer.correct ? "answer correct" : "answer wrong")
    );
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(1000, () => {
          handleEarned(quastionNumber);
          setSelectedAnswer(null);
          setQuestionNumber((prev) => prev + 1);
        });
      } else {
        wrongAnswer();
        delay(1000,()=>{
            setStop(true);
        })
      }
    });
  };

  return (
    <div className="trivia" >
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            key={a.text}
            onClick={() => handleSelectAnswer(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;
