window.addEventListener('load',()=>{
    const buttonMenu = document.querySelector('.buttonMovilMenu');
    const menuHeader = document.querySelector('.menuHeader');
    const buttonClose = document.querySelector('.cerraMenuBtn');
    
    //modal
    const deleteButton = document.querySelectorAll('.deleteModal');
    const buttonCloseModal = document.querySelector('.closeModal');
    const modalCont = document.querySelector('.modalCont');
    const inputModal = document.querySelector('.idButton');
    const titleModal = document.querySelector('.titleModal')

    //admin
    const selectLogo = document.querySelector("#logo")

buttonMenu.addEventListener('click',()=>{
    menuHeader.classList.toggle('mostrarMobile');
    buttonMenu.classList.toggle('ocultarMobile');
});
buttonClose.addEventListener('click',()=>{
    menuHeader.classList.remove('mostrarMobile')
    buttonMenu.classList.toggle('ocultarMobile');
})
if(deleteButton && buttonCloseModal){
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
if(selectLogo){
    const inputText = document.querySelector(".inputText");
    const inputImg = document.querySelector(".inputImg");
    selectLogo.addEventListener("change",(e)=>{
        console.log(e);
        if(selectLogo.value === "text"){
            inputText.classList.add("mostrarInput");
            inputText.classList.remove("ocultarInput");
            inputImg.classList.remove("mostrarInput");
            inputImg.classList.add("ocultarInput");
        }
        if(selectLogo.value === "img"){
            inputText.classList.add("ocultarInput")
            inputText.classList.remove("mostrarInput")
            inputImg.classList.add("mostrarInput");
            inputImg.classList.remove("ocultarInput");
        }
    })
}
const selectTournamentChange = document.querySelector("#selectTournament")
if(selectTournamentChange){
    const divisionSelect = document.querySelector(".divisionSelect");
    const filterSubmit = document.querySelector(".filterSubmit");
    const valueSelect = selectTournamentChange.value;

    selectTournamentChange.addEventListener("change",()=>{
        fetch('/tournament/api/change/'+selectTournamentChange.value)
        .then(result => result.json())
        .then(result => {
            divisionSelect.innerHTML=""
            for(let i = 0; i<result.divisions.data.length;i++){
                divisionSelect.innerHTML+=`
                    <option value="${result.divisions.data[i].id}">${result.divisions.data[i].name}</option>
                `
            }
        })
    })
}
const filterOptAdm = document.querySelector(".filterOpt");
if(filterOptAdm){
    const filterNameTeam = document.querySelector(".filterNameTeam");
    const filterDivTourTeam = document.querySelector(".filterDivTourTeam");
    filterOptAdm.addEventListener("change",()=>{
        filterNameTeam.classList.toggle("ocultarInput")
        filterDivTourTeam.classList.toggle("mostrarInput")
    })
}

//carrousel
const carrouselItems = [...document.querySelectorAll(".carrouselItem")]
const rightArrow = document.querySelector(".rightCarrousel")
const leftArrow = document.querySelector(".leftCarrousel")

const moveCarrousel = (direction)=>{
    const item = Number(document.querySelector(".sliderShow").dataset.id);
    let value;
    value = item;
    value += direction;
    if(value === 0 || value === carrouselItems.length +1){
        value = value === 0 ? carrouselItems.length : 1
    }
    carrouselItems[item-1].classList.toggle("sliderShow")
    carrouselItems[value-1].classList.toggle("sliderShow")
    console.log(carrouselItems[item-1]);
}
if(rightArrow){
    rightArrow.addEventListener("click",()=>{
        moveCarrousel(1)
    })
    leftArrow.addEventListener("click",()=>{
        moveCarrousel(-1)
    })
}

})