import { useRef } from "react";
import "./start.scss";

function Start({ setUsername }) {
  const inputRef = useRef();
  const handleStartBtn = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };
  return (
    <div className="start">
      <input
        autoComplete="true"
        ref={inputRef}
        type="text"
        placeholder="Enter your name"
        className="inputName"
        required
      />
      <button className="startBtn" onClick={handleStartBtn}>
        Start
      </button>
    </div>
  );
}

export default Start;
