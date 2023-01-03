import { useRef } from "react";

const Start = ({ setUsername }) => {

    const inputRef = useRef();

    const handleclick = () => {
       inputRef.current.value && setUsername(inputRef.current.value);
       
    }
    return(
        <div className="start">
            <input type="text"  placeholder="Enter Your Name" ref={inputRef} className="input-start"/>
            <button onClick={handleclick} className="start-button">Enter</button>
        </div>
    )
};

export default Start;