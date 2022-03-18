window.addEventListener('load',()=>{

    let buttonMenu = document.querySelector('.buttonMovilMenu');
    let menuHeader = document.querySelector('.menuAdmin');
    let buttonClose = document.querySelector('.cerraMenuBtn');
    
    buttonMenu.addEventListener('click',()=>{
        menuHeader.classList.toggle('mostrarMobile');
        buttonMenu.classList.toggle('ocultarMobile');
    });
    
    buttonClose.addEventListener('click',()=>{
        menuHeader.classList.remove('mostrarMobile')
        buttonMenu.classList.toggle('ocultarMobile');
    })
})
