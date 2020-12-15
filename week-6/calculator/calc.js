let body = document.querySelector('body');
let buttons = document.querySelectorAll('button');
body.addEventListener('keydown',e=>{
    console.log(e.key)
    buttons.forEach(button=>{
        if(button.innerText == e.key){
            console.log(button)
            button.focus();
        }
    })
})

buttons.forEach(button=>button.addEventListener('click',e=>{
    console.log(e.path[0].innerText)
}))
