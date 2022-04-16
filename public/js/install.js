const buttonBack = document.querySelector('.buttonBack');

if(buttonBack){
    buttonBack.addEventListener('click',(e)=>{
        e.preventDefault()
        window.history.back()
    })
}