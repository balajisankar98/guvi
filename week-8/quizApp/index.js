const saveEmailId = ()=>{
    if(localStorage.getItem("emailId") === null)
        try{
            let emailId = document.getElementById("emailId").value;
            console.log(emailId);
            localStorage.setItem("emailId",emailId);
            return true;
        }
        catch(er){
            console.error(er);
            return false;
        }
}


const checkIfEmailIdPresent = () =>{
    if(localStorage.getItem("emailId") !== null){
        document.getElementById("emailIdContainer").innerHTML = ``;
    }
}

checkIfEmailIdPresent();