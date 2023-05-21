import '../style/App.css';
import Board from './Board';
import StartScreen from './StartScreen';
import End from './End';
import collide from '../helper/collision';
import { useState, useEffect, useRef } from 'react';

const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(), ms)
  });
}

function App() {
  const [isArrowKeyPressed, setIsArrowKeyPressed] = useState(false);
  const [translation, setTranslation] = useState([50, 50]);
  const [translationBall, setTranslationBall] = useState([50, 50]);
  const [arrowKey, setArrowKey] = useState('');
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [key, setKey] = useState('');
  const [isMovingRight, setIsMovingRight] = useState(!Math.round(Math.random()));
  const [isMovingUp, setIsMovingUp] = useState(!Math.round(Math.random()));
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [score, setScore] = useState([0, 0]);
  const [start, setStart] = useState(false);

  const rightStick = useRef(document.querySelector('.right-stick'));
  const leftStick = useRef(document.querySelector('.left-stick'));
  const ball = useRef(document.querySelector('.ball'));
  const borderTop = useRef(document.querySelector('.border-top'));
  const borderBottom = useRef(document.querySelector('.border-bottom'));
  const board = useRef(document.querySelector('.main-board'));
  
  
  

  useEffect(() => {
    sleep(2).then(() => {
      if (isArrowKeyPressed && arrowKey === 'ArrowDown') {
        setTranslation(([prevRight, prevLeft]) => [prevRight, Math.min(prevLeft + 0.5, 87)]);
      }
      else if (isArrowKeyPressed && arrowKey === 'ArrowUp') {
        setTranslation(([prevRight, prevLeft]) => [prevRight, Math.max(prevLeft - 0.5, 13)]);
      }
      if (isKeyPressed && key === 'w') {
        setTranslation(([prevRight, prevLeft]) => [Math.max(prevRight - 0.5, 13), prevLeft]);
      }
      else if (isKeyPressed && key === 's') {
        setTranslation(([prevRight, prevLeft]) => [Math.min(prevRight + 0.5, 87), prevLeft]);
      }
    });
  //   let interval;
  //   if (isKeyPressed && key === 'ArrowDown') {
  //     interval = setInterval(() => {
  //       setTranslation((prev) => Math.min(prev + 1, 87));
  //     }, 10);
  //   }
  //   else if (isKeyPressed && key === 'ArrowUp') {
  //     interval = setInterval(() => {
  //       setTranslation((prev) => Math.max(prev - 1, 13));
  //     }, 10);
  //   }
  //   else if (!isKeyPressed) {
  //     clearInterval(interval);
  //   }
  //   return () => {clearInterval(interval)};
  }, [isArrowKeyPressed, translation, isKeyPressed, arrowKey, key]);
  
  useEffect(() => {
    if (start) {
      sleep(5).then(() => {
        setTranslationBall(([prevX, prevY]) => [prevX + (0.25 * (isMovingRight ? x : -x)), prevY + (0.25 * (isMovingUp ? -y : y))]);
      });
    }
  },[translationBall, isMovingRight, isMovingUp, start, x, y]);

  useEffect(() => {
    if (start) {
      if (rightStick.current && leftStick.current && ball.current && borderBottom.current && borderTop.current) {
        const leftRect = leftStick.current.getBoundingClientRect();
        const rightRect = rightStick.current.getBoundingClientRect();
        const ballRect = ball.current.getBoundingClientRect();
        const posStickLeft = leftRect.top + leftRect.height / 2;
        const posStickRight = rightRect.top + rightRect.height / 2;
        const posBall = ballRect.top + ballRect.height / 2;

        if (collide(leftRect, ballRect)) {
          const distance = Math.abs(posStickLeft - posBall);
          setX(0.05 * 1000/Math.max(distance, 10));
          setY(0.08 * distance);
          setIsMovingRight(!isMovingRight);
          setTranslationBall(([prevX, prevY]) => [prevX - 2, prevY])
        }
        if (collide(rightRect, ballRect)) {
          const distance = Math.abs(posStickRight - posBall);
          setX(0.05 * 1000/Math.max(distance, 15));
          setY(0.08 * distance);
          setIsMovingRight(!isMovingRight);
          setTranslationBall(([prevX, prevY]) => [prevX + 2, prevY])
        }
        if (collide(borderBottom.current.getBoundingClientRect(), ballRect) || collide(borderTop.current.getBoundingClientRect(), ballRect)) {
          if (isMovingUp) {
            setIsMovingUp(!isMovingUp)
            setTranslationBall(([prevX, prevY]) => [prevX, prevY + 2]);
          }
          else {
            setIsMovingUp(!isMovingUp)
            setTranslationBall(([prevX, prevY]) => [prevX, prevY - 2]);
          }
        }
        if (rightRect.right > ballRect.right || leftRect.left < ballRect.left) {
          setScore(([prevLeft, prevRight]) => [prevLeft + (rightRect.right > ballRect.right ? 1 : 0), prevRight + (leftRect.left < ballRect.left ? 1 : 0)]);
          setTranslationBall([50, 50]);
          setIsMovingRight(!Math.round(Math.random()));
          setIsMovingUp(!Math.round(Math.random()));
          setX(1);
          setY(1);
        }
      }
    }
  }, [isMovingRight, isMovingUp, translationBall, start]);

  

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      setIsArrowKeyPressed(true);
      setArrowKey('ArrowDown');
    }
    else if(e.key === 'ArrowUp') {
      setIsArrowKeyPressed(true);
      setArrowKey('ArrowUp');
    }
    else if(e.key === 'w') {
      setIsKeyPressed(true);
      setKey('w');
    }
    else if(e.key === 's') {
      setIsKeyPressed(true);
      setKey('s');
    }
  };

  function handleKeyUp(e) {
    if (e.key === 'ArrowDown') {
      setIsArrowKeyPressed(false);
      setArrowKey('ArrowDown');
    }
    else if(e.key === 'ArrowUp') {
      setIsArrowKeyPressed(false);
      setArrowKey('ArrowUp');
    }
    else if(e.key === 'w') {
      setIsKeyPressed(false)
      setKey('w');
    }
    else if(e.key === 's') {
      setIsKeyPressed(false)
      setKey('s');
    }
  };

  function handleClickStart() {
    setStart(true);
    if (board.current) {
      board.current.focus({ focusVisible: false});
    }
  }

  function handleClickEnd() {
    setStart(false);
    setScore([0, 0]);
    setTranslation([50, 50]);
    setTranslationBall([50, 50]);
  }

  return (
    <div className="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} >
      {!start && <StartScreen handleClick={handleClickStart} />}
      {score[0] < 10 && score[1] < 10 ? <Board 
        translation={translation}
        translationBall={translationBall}
        leftStickRef={leftStick}
        rightStickRef={rightStick}
        ballRef={ball}
        borderBottomRef={borderBottom}
        borderTopRef={borderTop}
        score={score}
        boardRef={board}
      /> : <End score={score} handleClick={handleClickEnd}/>}
    </div>
  );
}

export default App;
