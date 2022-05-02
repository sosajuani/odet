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

    //err cont
    const errorContName = document.querySelector(".errName");
    const errorContFile = document.querySelector(".errFile");
    const errorContTournament = document.querySelector(".errTournament");
    const errorContDivision = document.querySelector(".errDivision");

    if(nameTeamCreated){
        nameTeamCreated.addEventListener("blur",(e)=>{
            if(e.target.value.length < 2 ){
                nameTeamCreated.classList.add("errFormInput")
                nameTeamCreated.classList.remove("validFormInput")
                errorContName.innerHTML="El campo no puede estar vacio y debe tener mas de 2 caracteres"
            }else{
                nameTeamCreated.classList.remove("errFormInput")
                nameTeamCreated.classList.add("validFormInput")
                errorContName.innerHTML="";    
                if(e.target.value.length > 16){
                    nameTeamCreated.classList.add("errFormInput")
                    nameTeamCreated.classList.remove("validFormInput")
                    errorContName.innerHTML="No puede superar los 16 caracteres"
                }else{
                    nameTeamCreated.classList.remove("errFormInput")
                    nameTeamCreated.classList.add("validFormInput")
                    errorContName.innerHTML=""
                }
            }
        })
        tournamentIdTeamCreate.addEventListener("change",(e)=>{
            if(e.target.value === ""){
                tournamentIdTeamCreate.classList.add("errFormInput")
                tournamentIdTeamCreate.classList.remove("validFormInput")
                errorContTournament.innerHTML="El campo no puede estar vacio"
            }else{
                tournamentIdTeamCreate.classList.remove("errFormInput")
                tournamentIdTeamCreate.classList.add("validFormInput")
                errorContTournament.innerHTML=""
            }
        })
        templateCreateTeamDiv.addEventListener("change",(e)=>{
            if(e.target.value === ""){
                templateCreateTeamDiv.classList.add("errFormInput")
                templateCreateTeamDiv.classList.remove("validFormInput")
                errorContDivision.innerHTML="El campo no puede estar vacio"
            }else{
                templateCreateTeamDiv.classList.remove("errFormInput")
                templateCreateTeamDiv.classList.add("validFormInput")
                errorContDivision.innerHTML=""
            }
        })

        nameTeamCreated.addEventListener("keyup",()=>{
            templateCreateTeamName.textContent = "Nombre: "+nameTeamCreated.value
        });
        fileTeamCreated.addEventListener("change",(e)=>{
            templateCreateTeamAvatar.innerHTML='<img src="/img/teams/default.png" alt="avatar">';
            let reader = new FileReader();
            if(e.target.files[0]){     
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = ()=>{
                    let image = document.createElement('img')
                    image.src = reader.result
                    templateCreateTeamAvatar.innerHTML='';
                    extensionsValid.includes(extensionArchive) === true 
                     ? templateCreateTeamAvatar.append(image)
                     : templateCreateTeamAvatar.innerHTML='archivo no valido';
                }
                let archiveName = fileTeamCreated.value;
                let extensionArchive = archiveName.split(".").pop().toLowerCase()
                const extensionsValid = ['jpg','png','jpeg']
                if(extensionsValid.includes(extensionArchive) === false){
                    fileTeamCreated.classList.add("errFormInput");
                    fileTeamCreated.classList.remove("validFormInput");
                    errorContFile.innerHTML="Extensión no valida";
                }else{
                    errorContFile.innerHTML="";
                    fileTeamCreated.classList.remove("errFormInput");
                    fileTeamCreated.classList.add("validFormInput");
                }
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

    //banner upload

    //banner modal
    const openModal = document.querySelectorAll(".openModal");

    openModal.forEach(item =>{
        item.addEventListener("click",()=>{
            alert("hola")
        })
    })




})
