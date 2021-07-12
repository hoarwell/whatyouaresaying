import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Home = () => {
    const [final, setFinal] = useState("");
    const [click, setClick] = useState(false);
    const [lang, setLang] = useState("ko-KR");
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [detecting, setDetecting] = useState(false);
    const [char, setChar] = useState("");
    const [freq, setFreq] = useState("")

    const buttonRef = useRef();
    const resultRef = useRef();
    const selectRef = useRef();
    const imgRef = useRef();

    let fontStyle;

    let images = [];
    let zIndex = 1;

    let finalArray = [];
    let charArray = [];

    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const handleSelect = (e) => {
        setLang(e.target.value);
    }
    // speech recognition
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = lang;

    // get usermedia
    navigator.getUserMedia = navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia;

    const callback = (stream) => {
        let ctx = new AudioContext();
        let mic = ctx.createMediaStreamSource(stream);
        let analyser = ctx.createAnalyser();
        let osc = ctx.createOscillator();

        mic.connect(analyser); 
        osc.connect(ctx.destination);
        osc.start(0);

        let data = new Uint8Array(analyser.frequencyBinCount);

        function play() {
            analyser.getByteFrequencyData(data);

            let idx = 0;
            for (let j=0; j < analyser.frequencyBinCount; j++) {
                if (data[j] > data[idx]) {
                    idx = j;
                }
            }

            let frequency = idx * ctx.sampleRate / analyser.fftSize;
            osc.frequency.value = frequency;
            document.body.style.backgroundColor = `rgb(${frequency / 5}, ${frequency / 5}, ${frequency / 5})`;
            const elements = document.querySelectorAll('.result');
            if(elements.length > 0){
                elements[elements.length - 1].style.color = `rgb(${-((frequency / 5) - 255)}, ${-((frequency / 5) - 255)}, ${-((frequency / 5) - 255)})`;
            }
            requestAnimationFrame(play);
        }
        play();
    }

    navigator.getUserMedia({ video : false, audio : true }, callback, console.log);

    const handleClick = () => {
        setClick(!click);
        handleStart();
        buttonRef.current.classList.add('clicked');
        document.querySelectorAll('.sentence').forEach((element) => {
            element.classList.add('clicked');
        })
        selectRef.current.classList.add('clicked');
    }

    const handleStart = () => {
        recognition.start();
    }

    const changePosition = () => {
        let elements = document.querySelectorAll('.result');
        for(let i = 0; i <  elements.length; i++){
            // elements[elements.length - 1].style.transform = `scaleY(${ getRandom(0.5, 5)})`;
            elements[elements.length - 1].style.left= `${ getRandom(100, window.innerWidth)}px`;
            elements[elements.length - 1].style.top = `${ getRandom(100, window.innerHeight)}px`;
            elements[elements.length - 1].style.zIndex = ++zIndex;
        }
    }
    
    const typeWriter = (transcript) => {
        if(transcript){
            let string = transcript[transcript.length-1];
            for(let i = 0; i < string.length; i++){
                charArray.push(string.charAt(i));
                setTimeout(typeWriter, 50);
            }
            setChar(charArray);
        }
    }

    const getImage = (transcript) => {
        console.log("getImage executed,", transcript[transcript.length-1])
        axios.get(`https://images.google.com/images?um=1&hl=en&nfpr=1&q=${transcript[transcript.length-1]}`)
            .then((res)=> { 
                const search = document.querySelector(".search");
                search.innerHTML = res.data;
                search.querySelectorAll("img").forEach((element) => {
                    if(element.hasAttribute("data-src")){
                        const firstImage = element.getAttribute('data-src');
                        images.push(firstImage);
                        setSearchResult(images[images.length-1]);
                    }
                });
            }
        )
    }

    const handleResult = () => {
        recognition.onresult = (e) => {
            let finalTranscripts = "";
            for(let i = e.resultIndex; i < e.results.length; i++){
                let transcript = e.results[i][0].transcript;
                if (e.results[i].isFinal) { 
                    finalTranscripts += transcript;
                }
                finalArray.push(finalTranscripts);
            }
            setFinal(...final, finalArray.filter((element) => element !== ""));
            getImage(finalArray)
            typeWriter(finalArray)
            changePosition();
        }

        recognition.onsoundstart = () => {
            console.log('Some sound is being received');
        }

        recognition.onspeechstart = () => {
            console.log('Speech has been detected');
            setDetecting(true);
        }

        recognition.onspeechend = function() {
            console.log('Speech has stopped being detected');
            recognition.stop();
            setDetecting(false);
        }
    }

    useEffect(() => {
        handleResult();
        // getImage function 두면 axios 요청이 너무 많아짐
        typeWriter();
    })

    return (
            <div className = "home-container">
                <button className = "enter-button" onClick = { handleClick } ref = { buttonRef }>
                    <img src = "https://pngimg.com/uploads/ear/ear_PNG35695.png" alt = "ear-image" />
                </button>
                <select className = "select" onChange = { handleSelect } ref = { selectRef }>
                    <option value="ko-KR" selected>Korean</option> 
                    <option value="en-US">English</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="ja-JP">Japanese</option>
                </select>
                {
                    final ? final.map((data, i) =>
                        <p className = "result">{ data }</p>
                    ) : ""
                }
                {
                    searchResult ? <img className = "search-image" ref = { imgRef } src = { searchResult } alt = "" /> : ""
                }
                <div className= "search"></div>
                <div className= "char-container">
                    {
                        char ? (
                            char.map((text, i) => (
                                <p className = "char" data-id = { i }>{ text }</p>
                            ))
                        ) : ""
                    }
                </div>
            </div>
    );
}

export default Home;