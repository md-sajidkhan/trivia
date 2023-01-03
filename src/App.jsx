
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './App.css'
import Start from './components/Start';
import Timer from './components/Timer';
import Trivia from './components/Trivia';

function App() {

  const [questionNumber, setQuestionNumber] = useState(0);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState(0);
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  // let items = {};

  useEffect(() => {
    axios.get("https://the-trivia-api.com/api/questions")
    .then((res) => {
      const result = res.data;
      result.map((r, index) => {
        setData(prevData => [...prevData, {
          id: index + 1,
          question: r.question,
          correct: r.correctAnswer,
          incorrect: r.incorrectAnswers,
          options: [r.correctAnswer, ...r.incorrectAnswers],
        }])
      })
    })
    
  },[])
  const mp = useMemo(() => 
    [
      {id: 1, amount: 1000},
      {id: 2, amount: 10000},
      {id: 3, amount: 50000},
      {id: 4, amount: 100000},
      {id: 5, amount: 250000},
      {id: 6, amount: 500000},
      {id: 7, amount: 1000000},
      {id: 8, amount: 2500000},
      {id: 9, amount: 5000000},
      {id: 10, amount: 10000000},
    ].reverse(), []  )
  useEffect(() => {
    questionNumber >0 && setEarned(mp.find((m) => m.id - 1 === questionNumber - 1).amount);
  },[mp, questionNumber])
  return (
    <div className="App">
      {
        username ? (
          <>
          
            <div className="main">
        { stop ? ( <h1 className='endText'>You Earned : { earned } $ </h1>) : 
        (<>
        <div className="top">
          <div className="timer"><Timer setStop={setStop} questionNumber = {questionNumber}/></div>
        </div>
        <div className="bottom">
          <Trivia data={data} setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber}/>
        </div>
        </>
          )
    }
      </div>
      <div className="moneypyramid">
        <div className="username">{username}</div>
        <div className="moneyList">
          {
            mp.map((m) => (
              <li className={`moneyListItem ${ questionNumber+1 === m.id ? 'active' : ''}`} key={m.id}>
                <span className="moneyListItemNumber">{m.id}</span>
                <span className="moneyListItemAmount">₹ {m.amount}</span>
              </li>
            ))
          }
          
        </div>
      </div>
          </>
        ) : <Start setUsername={setUsername}/>
      }
    </div>
  )
}

export default App
