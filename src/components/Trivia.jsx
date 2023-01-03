import { useEffect } from "react";
import { useState } from "react";
import useSound from "use-sound";
import play from '../sounds/play.mp3';
import correct from '../sounds/correct.mp3';
import wrong from '../sounds/wrong.mp3';

const Trivia = ({ data, setStop, setQuestionNumber, questionNumber}) => {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [classname, setClassname] = useState('answer'); 
    

    // const [letsPlay] = useSound(play);
    // const [correctAnswer] = useSound(correct);
    // const [wrongAnswer] = useSound(wrong);

    // useEffect(() => {
    //     letsPlay();
    // },[letsPlay])

    useEffect(() => {
        setQuestion(data[questionNumber]);
        
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };


    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassname('answer active');
        delay(3000, function () {
            setClassname(a === question.correct ? 'answer correct': 'answer wrong')
        } );
        delay(6000, () => {
            if(a === question.correct){
                // correctAnswer();
                delay(3000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                })
            }
            else{
                // wrongAnswer();
                delay(1000, () => setStop(true))
                
            }
        })
    };

    return(
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {
                    question?.options.map((a, index) => (
                        <div key={index} className={selectedAnswer === a ? classname : 'answer'} onClick={() => handleClick(a)}>{a}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Trivia;