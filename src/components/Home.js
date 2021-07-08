import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Home = () => {
    const [result, setResult] = useState(""); // 결과
    const [click, setClick] = useState(false);
    const [support, setSupport] = useState(false);
    const [lang, setLang] = useState("ko-KR");
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const buttonRef = useRef();
    const resultRef = useRef();
    const selectRef = useRef();
    const imgRef = useRef();

    const getRandom = (num) => {
        return Math.floor(Math.random() *  num);
    }

    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia );
    
    let constraints = { 
        video : false, 
        audio : true,
    }

    const handleSelect = (e) => {
        setLang(e.target.value);
    }

    const askSupport = () => {
        if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { 
            setSupport(true);
        } else {
            setSupport(false);
        }
    }

    useEffect(() => {
        askSupport();
    }, [])
    
    if(support){
        let promise = navigator.mediaDevices.getUserMedia(constraints);
        promise.then(callback).catch(err => console.log(err));
    }

    function callback(stream) {
        let ctx = new AudioContext();
        let mic = ctx.createMediaStreamSource(stream);
        let analyser = ctx.createAnalyser();
        
        mic.connect(analyser);

        function play() {
            let array = new Uint8Array(analyser.frequencyBinCount);
            let values = 0;
            analyser.getByteFrequencyData(array);
            let length = array.length;
    
            for (let i = 0; i < length; i++) {
                values += (array[i]);
            }
            let average = values / length;
                requestAnimationFrame(play);
            }
            
            play();
    }

    let resultArray = [];
    let images = [];
    let zIndex = 1;

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    
    const handleClick = () => {
        setClick(!click);
        recognition.start();
        buttonRef.current.classList.add('clicked');
        document.querySelectorAll('.sentence').forEach((element) => {
            element.classList.add('clicked');
        })
        selectRef.current.classList.add('clicked');
    }

    const changePosition = () => {
        if(result) {
            resultRef.current.style.transform = `scale(${ getRandom(5)})`;
            resultRef.current.style.left= `${ getRandom(window.innerWidth) - resultRef.current.style.width }px`;
            resultRef.current.style.top = `${ getRandom(window.innerHeight) - resultRef.current.style.height }px`;
            resultRef.current.style.zIndex = ++zIndex;
        }
        if(imgRef.current && result.length % 10 === 0){
            imgRef.current.style.left = `${ getRandom(window.innerWidth) - resultRef.current.style.width }px`;
            imgRef.current.style.top = `${ getRandom(window.innerHeight) - resultRef.current.style.height }px`;
            imgRef.current.style.zIndex = ++zIndex;
        }
    }
    let count = 1;
    
    const getImage = () => {
        axios.get(`https://images.google.com/images?um=1&hl=en&nfpr=1&q=${keyword}`)
            .then((res)=> {
                console.log(++count);
                const search = document.querySelector(".search");
                search.innerHTML = res.data;
                search.querySelectorAll("img").forEach((element) => {
                    if(element.hasAttribute("data-src")){
                        const firstImage = element.getAttribute('data-src');
                        images.push(firstImage);
                        setSearchResult(images[0]);
                    }
                });
            })
    }

    useEffect(() => {
        recognition.onresult = (e) => {
            if(e.results.length > 0){
                for (let i = 0; i < e.results.length; i++) {
                    setKeyword(e.results[i][0].transcript);
                    if (i === e.results.length - 1) {
                        resultArray.push(e.results[i][0].transcript);
                        setResult([...resultArray]); // 여기서 짝으로 배열에 넣어주면 될 것 같은데
                    }
                }
            }
        }
        if((result.length % 10) === 0){
            getImage();
        }
        changePosition();
    })
    console.log(result);
    // 음정의 톤에 따라 scaleX, scaleY 가 달라지는 이펙트도 좋을 것 같다.
    // animation의 경로도 바꿔지게

    return (
        <div className = "home-container">
            <button className = "enter-button" onClick = { handleClick } ref = { buttonRef }>
                <img src = "https://pngimg.com/uploads/ear/ear_PNG35695.png" alt = "" />
            </button>
            <select className = "select" onChange = { handleSelect } ref = { selectRef }>
                <option value="ko-KR" selected>Korean</option> 
                <option value="en-US">English</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="ja-JP">Japanese</option>
            </select>
            {
                result ? result.map((data, i) => (
                        <p className = "result" ref = { resultRef }>{ data }</p>
                    )
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