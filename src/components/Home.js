import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Home = () => {
    const [final, setFinal] = useState("");
    const [click, setClick] = useState(false);
    const [lang, setLang] = useState("ko-KR");
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [detecting, setDetecting] = useState(false);

    const buttonRef = useRef();
    const resultRef = useRef();
    const selectRef = useRef();
    const imgRef = useRef();

    let images = [];
    let zIndex = 1;

    let finalArray = [];

    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const handleSelect = (e) => {
        setLang(e.target.value);
    }

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = lang;
    
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
            elements[elements.length - 1].style.transform = `scale(${ getRandom(0.5, 5)})`;
            elements[elements.length - 1].style.transform = `scale(${ getRandom(0.5, 5)})`;
            elements[elements.length - 1].style.left= `${ getRandom(100, window.innerWidth)}px`;
            elements[elements.length - 1].style.top = `${ getRandom(100, window.innerHeight)}px`;
            elements[elements.length - 1].style.zIndex = ++zIndex;
        }
    }

    const typeWriter = () => {
        let i = 0;
        let render = ""
    
        if(final.length > 0){
            if (i < final.length) {
                render += [final.length - 1].charAt(i);
                i++;
            }
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
    console.log(searchResult);

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
            console.log(finalArray)
            getImage(finalArray)
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
    console.log(final, "final");

    useEffect(() => {
        handleResult();
        // getImage function 두면 axios 요청이 너무 많아짐
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
            </div>
    );
}

export default Home;