let h1 = document.querySelector('h1');
let body = document.querySelector('body');
body.style.background = "#3498db"
setTimeout(function(){
    h1.innerHTML = '9';
    body.style.background = "#2c3e50"
    setTimeout(function(){
        h1.innerHTML = '8';
        body.style.background = "#c0392b"
        setTimeout(function(){
            h1.innerHTML = '7';
            body.style.background = "#1abc9c"
            setTimeout(function(){
                h1.innerHTML = '6';
                body.style.background = "#ecf0f1"
                setTimeout(function(){
                    h1.innerHTML = '5';
                    body.style.background = "#9b59b6"
                    setTimeout(function(){
                        h1.innerHTML = '4';
                        body.style.background = "#f1c40f"
                        setTimeout(function(){
                            h1.innerHTML = '3';
                            body.style.background = "#27ae60"
                            setTimeout(function(){
                                h1.innerHTML = '2';
                                body.style.background = "#c0392b"
                                setTimeout(function(){
                                    h1.innerHTML = '1';
                                    body.style.background = "#f3a683"
                                    setTimeout(function(){
                                        h1.innerHTML = 'BOOM!';
                                        body.style.background = "#3dc1d3"
                                        setTimeout(function(){
                                            h1.innerHTML = 'HAPPY INDEPENDENCE DAY';
                                        },1000)
                                    },1000)
                                },1000)
                            },1000)
                        },1000)
                    },1000)
                },1000)
            },1000)
        },1000)
    },1000)
},1000)