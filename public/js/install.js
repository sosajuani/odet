const buttonBack = document.querySelector('.buttonBack');

if(buttonBack){
    buttonBack.style.cursor="pointer"
    buttonBack.addEventListener('click',(e)=>{
        e.preventDefault()
        window.history.back()
    })
}