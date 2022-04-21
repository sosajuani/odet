window.addEventListener('load',()=>{

    //team created
    const nameTeamCreated = document.querySelector(".nameTeamCreated");
    const fileTeamCreated = document.querySelector(".fileTeamCreated");
    const tournamentIdTeamCreate = document.querySelector(".tournamentIdTeamCreate");
    const divisionIdTeamCreate = document.querySelector(".divisionIdTeamCreate");

    //template team
    const templateCreateTeamName = document.querySelector(".templateCreateTeamName");
    const templateCreateTeamCap = document.querySelector(".templateCreateTeamCap");
    const templateCreateTeamTour = document.querySelector(".templateCreateTeamTour");
    const templateCreateTeamDiv = document.querySelector(".templateCreateTeamDiv")

    if(nameTeamCreated){
        nameTeamCreated.addEventListener("keydown",()=>{
            templateCreateTeamName.textContent = "Nombre: "+nameTeamCreated.value
        })
    }
})
