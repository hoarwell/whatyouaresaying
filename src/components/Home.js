import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
    const [result, setResult] = useState(""); // 결과
    const [click, setClick] = useState(false);

    const buttonRef = useRef();
    const resultRef = useRef();

    let resultArray = [];

    let zIndex = 1;

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    
    const handleClick = () => {
        setClick(!click);
        recognition.start();
        buttonRef.current.classList.add('clicked');
    }

    const getRandom = (num) => {
        return Math.floor(Math.random() *  num);
    }

    const changePosition = () => {
        if(result) {
            resultRef.current.style.left= `${ getRandom(window.innerWidth) - resultRef.current.style.width }px`;
            resultRef.current.style.top = `${ getRandom(window.innerHeight) - resultRef.current.style.height }px`;
            resultRef.current.style.zIndex = ++zIndex;
        }
    }

    useEffect(() => {
        recognition.onresult = (e) => {
            if(e.results.length > 0){
                for (let i = 0; i < e.results.length; i++) {
                    if (i === e.results.length - 1) {
                        resultArray.push(e.results[i][0].transcript);
                        setResult([...resultArray]);
                    }
                }
            }
        }
        changePosition();
    })
    
    console.log(result);

    // 음정의 톤에 따라 scaleX, scaleY 가 달라지는 이펙트도 좋을 것 같다.
    // animation의 경로도 바꿔지게

    return (
        <div className = "home-container">
            <button className = "enter-button" onClick = { handleClick } ref = { buttonRef }>
                ENTER
            </button>
            {
                result ? (
                    result.map((data, i) => (
                        <marquee className = "result" ref = { resultRef }>
                            { data }
                        </marquee>
                    ))
                ) : ""
            }
        </div>
    );
}

export default Home;