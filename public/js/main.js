let buttonMenu = document.querySelector('.buttonMovilMenu');
let menuHeader = document.querySelector('.menuHeader');
let buttonClose = document.querySelector('.cerraMenuBtn');

buttonMenu.addEventListener('click',()=>{
    menuHeader.classList.toggle('mostrarMobile');
    buttonMenu.classList.toggle('ocultarMobile');
});

buttonClose.addEventListener('click',()=>{
    
    menuHeader.classList.remove('mostrarMobile')
    buttonMenu.classList.toggle('ocultarMobile');
})


// let seleccion = (item)=>{
//     const vari = document.querySelector(item);
//     return vari;
// }
// let mostrar = (boton1,mostrar,btnCierra)=>{
//     let buttonMostrar = seleccion(boton1);
//     let mostrarItem = seleccion(mostrar);
//     let cierraMenu = seleccion(btnCierra);
//     buttonMostrar.addEventListener('click',()=>{
//         mostrarItem.classList.toggle("mostrarMobile");
//         buttonMostrar.classList.toggle("ocultarMobile");
//     });
//     cierraMenu.addEventListener('click',()=>{
//         mostrarItem.classList.remove("mostrarMobile");
//         buttonMostrar.classList.remove("ocultarMobile");
//     });
// }
// mostrar(".buttonMovilMenu","menuHeader","cerraMenuBtn");
// mostrar(".buttonMovilMenu","menuAdmin","cerraMenuBtn");
