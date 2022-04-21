window.addEventListener('load',()=>{

    //team created
    const nameTeamCreated = document.querySelector(".nameTeamCreated");
    const fileTeamCreated = document.querySelector(".fileTeamCreated");
    const tournamentIdTeamCreate = document.querySelector(".tournamentIdTeamCreate");
    const divisionIdTeamCreate = document.querySelector(".divisionIdTeamCreate");

    //template team
    const templateCreateTeamAvatar = document.querySelector(".templateCreateTeamAvatar");
    const templateCreateTeamName = document.querySelector(".templateCreateTeamName");
    const templateCreateTeamCap = document.querySelector(".templateCreateTeamCap");
    const templateCreateTeamTour = document.querySelector(".templateCreateTeamTour");
    const templateCreateTeamDiv = document.querySelector(".templateCreateTeamDiv")

    if(nameTeamCreated){
        nameTeamCreated.addEventListener("keyup",()=>{
            templateCreateTeamName.textContent = "Nombre: "+nameTeamCreated.value
        });
        fileTeamCreated.addEventListener("change",(e)=>{
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = ()=>{
                let image = document.createElement('img')
                
                image.src = reader.result
                templateCreateTeamAvatar.innerHTML='';
                templateCreateTeamAvatar.append(image)
            }         
        });
        tournamentIdTeamCreate.addEventListener('change',()=>{
            let tournamentText = tournamentIdTeamCreate.options[tournamentIdTeamCreate.selectedIndex].innerText;
            templateCreateTeamDiv.innerHTML="Division: ";
            templateCreateTeamTour.innerHTML= "Torneo: "+tournamentText
        });
        divisionIdTeamCreate.addEventListener("change",()=>{
            let divisionText = divisionIdTeamCreate.options[divisionIdTeamCreate.selectedIndex].innerText;
            templateCreateTeamDiv.innerHTML="Division: "+divisionText
        })
    }
})
