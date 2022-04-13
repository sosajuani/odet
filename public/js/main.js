window.addEventListener('load',()=>{
    let buttonMenu = document.querySelector('.buttonMovilMenu');
    let menuHeader = document.querySelector('.menuHeader');
    let buttonClose = document.querySelector('.cerraMenuBtn');
    
    //modal
    const deleteButton = document.querySelectorAll('.deleteModal');
    const buttonCloseModal = document.querySelector('.closeModal');
    const modalCont = document.querySelector('.modalCont');
    const inputModal = document.querySelector('.idButton');
    const titleModal = document.querySelector('.titleModal')

buttonMenu.addEventListener('click',()=>{
    menuHeader.classList.toggle('mostrarMobile');
    buttonMenu.classList.toggle('ocultarMobile');
});

buttonClose.addEventListener('click',()=>{
    
    menuHeader.classList.remove('mostrarMobile')
    buttonMenu.classList.toggle('ocultarMobile');
})

if(deleteButton){
    console.log(deleteButton);

    deleteButton.forEach(element =>{
        element.addEventListener('click',(e)=>{
            e.preventDefault();
            modalCont.classList.add('mostrarModal');
            inputModal.value=e.currentTarget.id;
            titleModal.innerHTML= `¿Seguro quiere eliminar el torneo? ${e.currentTarget.id}`
        })
    })
    buttonCloseModal.addEventListener('click',()=>{
        modalCont.classList.remove('mostrarModal');
        inputModal.value=""
        titleModal.innerHTML= `¿Seguro quiere eliminar el torneo?`
    })
}
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
