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

    //function preview file
    const previewFunction = (input,preview)=>{
        const inputFile = document.querySelector(input);
        const previewDiv = document.querySelector(preview)
        inputFile.addEventListener("change",(e)=>{
            let reader = new FileReader();
            if(e.target.files[0]){  
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = ()=>{
                    let image = document.createElement('img')
                    image.src = reader.result
                    previewDiv.innerHTML='';
                    extensionsValid.includes(extensionArchive) === true 
                     ? previewDiv.append(image)
                     : previewDiv.innerHTML='archivo no valido';
                }
            }
            let archiveName = inputFile.value;
            let extensionArchive = archiveName.split(".").pop().toLowerCase()
            const extensionsValid = ['jpg','png','jpeg']
        })
    }  


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
    //previewFunction(".inputFileField",".imagePreview")
    const uploadBannerBtn = document.querySelector(".uploadBannerBtn")
    if(uploadBannerBtn){
        previewFunction(".uploadBanner",".imagePreview")
    }
    const uploadSponsorBtn = document.querySelector(".uploadSponsorBtn");
    if(uploadSponsorBtn){
        previewFunction(".uploadSponsor",".imagePreviewSponsor")
    }
    //sponsor modal
    const sponsorItem = document.querySelectorAll(".sponsorItem");
    const previewSponsor = document.querySelector(".previewSponsor");
    const disabledBtn = document.querySelector(".disabledBtn");
    if(sponsorItem){
        sponsorItem.forEach(item =>{
            item.addEventListener("click",()=>{
                const dataSetSponsor = item.dataset.id
                previewSponsor.src = item.children[1].src
                if(item.children[0].value == 1){
                    disabledBtn.classList.add("btn--gray");
                    disabledBtn.classList.remove("btn--green");
                    disabledBtn.innerText = "DESACTIVAR"
                }else{
                    disabledBtn.innerText = "ACTIVAR"
                    disabledBtn.classList.add("btn--green");
                    disabledBtn.classList.remove("btn--gray");
                }
                modalAdm.classList.toggle("mostrarMobile");
            })
        })
    }

    //banner modal
    const modalAdm = document.querySelector(".bannerHome");
    if(modalAdm){
        const openModal = document.querySelectorAll(".openModal");
        const modalEdit = document.querySelector(".modalEdit")
        const closeModal = document.querySelectorAll(".btnClose");
        const previewImageModalBanner = document.querySelector(".previewImageModalBanner");
        const disabledBtn = document.querySelector(".disabledBtn");
        const statusBanner = document.querySelector(".statusBanner");
        const idInputBanner = document.querySelector(".idInput");
        const btnEditModal = document.querySelector(".btnEditModal");

        openModal.forEach(item =>{
            const id = item.dataset.id;
            item.addEventListener("click",()=>{
                fetch('/admin/api/bannerdata/'+id)
                .then(res => res.json())
                .then(data => {
                    previewImageModalBanner.innerHTML=`
                        <img src="/img/banners/${data.banner.data.image}" alt="banner_${data.banner.data.id}" />
                    `;
                    if(data.banner.data.active === 1){
                        disabledBtn.classList.add("btn--gray");
                        disabledBtn.classList.remove("btn--green");
                        disabledBtn.innerText = "DESACTIVAR"
                    }else{
                        disabledBtn.innerText = "ACTIVAR"
                        disabledBtn.classList.add("btn--green");
                        disabledBtn.classList.remove("btn--gray");
                    }
                    statusBanner.value= data.banner.data.active;
                    idInputBanner.value = id;
                    btnEditModal.href = `/admin/banner/${id}/edit`
                })
                modalAdm.classList.toggle("mostrarMobile");
                disabledBtn.addEventListener("click",(e)=>{
                    
                })
            })
        });
        closeModal.forEach(closeBtn =>{
            closeBtn.addEventListener("click",()=>{
                modalAdm.classList.remove("mostrarMobile");
                modalEdit.classList.remove("mostrarMobile");
            });
        })    
    }
})
