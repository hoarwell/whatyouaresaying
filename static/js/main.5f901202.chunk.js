(this.webpackJsonpwhatyouaresaying=this.webpackJsonpwhatyouaresaying||[]).push([[0],{32:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(24),s=n.n(a),i=(n(32),n(26)),o=n(2),l=n(9),u=n(25),d=n.n(u),h=n(1),j=function(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(!1),s=Object(l.a)(a,2),i=s[0],o=s[1],u=Object(c.useState)(!1),j=Object(l.a)(u,2),g=j[0],b=j[1],f=Object(c.useState)("ko-KR"),O=Object(l.a)(f,2),p=O[0],m=O[1],v=Object(c.useState)(""),x=Object(l.a)(v,2),y=x[0],w=x[1],S=Object(c.useState)(""),M=Object(l.a)(S,2),k=M[0],R=M[1],A=Object(c.useRef)(),U=Object(c.useRef)(),N=Object(c.useRef)(),q=Object(c.useRef)(),E=function(e){return Math.floor(Math.random()*e)};navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;(Object(c.useEffect)((function(){navigator&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?b(!0):b(!1)}),[]),g)&&navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then((function(e){var t=new AudioContext,n=t.createMediaStreamSource(e),c=t.createAnalyser();function r(){var e=new Uint8Array(c.frequencyBinCount);c.getByteFrequencyData(e);for(var t=e.length,n=0;n<t;n++)e[n];requestAnimationFrame(r)}n.connect(c),r()})).catch((function(e){return console.log(e)}));var C=[],D=[],F=1,G=new(window.SpeechRecognition||window.webkitSpeechRecognition);G.continuous=!0,G.interimResults=!0,G.lang=p;return Object(c.useEffect)((function(){G.onresult=function(e){if(e.results.length>0)for(var t=0;t<e.results.length;t++)w(e.results[t][0].transcript),t===e.results.length-1&&(C.push(e.results[t][0].transcript),r([].concat(C)))},n.length%10===0&&d.a.get("https://images.google.com/images?um=1&hl=en&nfpr=1&q=".concat(y)).then((function(e){var t=document.querySelector(".search");t.innerHTML=e.data,t.querySelectorAll("img").forEach((function(e){if(e.hasAttribute("data-src")){var t=e.getAttribute("data-src");D.push(t),console.log(D),R(D[0])}}))})),n&&(U.current.style.transform="scale(".concat(E(3),")"),U.current.style.left="".concat(E(window.innerWidth)-U.current.style.width,"px"),U.current.style.top="".concat(E(window.innerHeight)-U.current.style.height,"px"),U.current.style.zIndex=++F),q.current&&n.length%10===0&&(q.current.style.left="".concat(E(window.innerWidth)-U.current.style.width,"px"),q.current.style.top="".concat(E(window.innerHeight)-U.current.style.height,"px"),q.current.style.zIndex=++F)})),console.log(y),console.log(k),console.log(n),Object(h.jsxs)("div",{className:"home-container",children:[Object(h.jsx)("button",{className:"enter-button",onClick:function(){o(!i),G.start(),A.current.classList.add("clicked"),document.querySelectorAll(".sentence").forEach((function(e){e.classList.add("clicked")})),N.current.classList.add("clicked")},ref:A,children:Object(h.jsx)("img",{src:"https://pngimg.com/uploads/ear/ear_PNG35695.png",alt:""})}),Object(h.jsxs)("select",{className:"select",onChange:function(e){m(e.target.value)},ref:N,children:[Object(h.jsx)("option",{value:"ko-KR",selected:!0,children:"Korean"}),Object(h.jsx)("option",{value:"en-US",children:"English"}),Object(h.jsx)("option",{value:"es-ES",children:"Spanish"}),Object(h.jsx)("option",{value:"fr-FR",children:"French"}),Object(h.jsx)("option",{value:"ja-JP",children:"Japanese"})]}),n?n.map((function(e,t){return Object(h.jsx)("p",{className:"result",ref:U,children:e})})):"",k?Object(h.jsx)("img",{className:"search-image",ref:q,src:k,alt:""}):"",Object(h.jsx)("div",{className:"search"})]})},g=function(){return Object(h.jsx)(i.a,{children:Object(h.jsx)(o.c,{children:Object(h.jsx)(o.a,{exact:!0,path:"/",children:Object(h.jsx)(j,{})})})})};var b=function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(g,{})})};s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(b,{})}),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.5f901202.chunk.js.map