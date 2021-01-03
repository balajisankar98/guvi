const getRecords = async ()=>{
    let emailId = localStorage.getItem("emailId");
    let apiResponse = await fetch(`https://5fecbcd6595e420017c2c218.mockapi.io/quiz/score?sortBy=high_score&order=desc`);
   let result = await apiResponse.json();
    let tableBody = document.getElementById("tableBody");
   result.forEach((element,index) => {
       let tr = createElement("tr",``,tableBody);
       if(emailId != null && emailId === element.email){
        tr.setAttribute('class',"table-active");
       }
       tr.innerHTML = `
            <td scope="col">${index + 1}</td>
            <td scope="col">${element.email}</td>
            <td scope="col">${element.high_score}</td>
       `
   });
}


const createElement = (elem , classes , parentElem) =>{
    let createdElement = document.createElement(elem);
    createdElement.setAttribute('class',classes);
    parentElem.append(createdElement);
    return createdElement;
}

getRecords();