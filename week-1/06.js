
// Parsing a list of lists and convert into a JSON object:
arr= [[["firstName", "Vasanth"], ["lastName", "Raja"], ["age", 24], ["role", "JSWizard"]], [["firstName", "Sri"], ["lastName", "Devi"], ["age", 28], ["role", "Coder"]]];
console.log(transformEmployeeData(arr));
function transformEmployeeData(arr) {
    let tranformEmployeeList = [];
    for(let object of arr ){
        tranformEmployeeList.push(fromListToObject(object));
    } 
    return tranformEmployeeList;
}

function fromListToObject(arr) {
    let newObject = {};
       for(let value of arr ){
           newObject[value[0]] = value[1];
       }
    return newObject;
   //  Object.fromEntries(arr);
}