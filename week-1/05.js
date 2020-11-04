
// Parsing a list of lists and convert into a JSON object:
arr = [["make", "Ford"], ["model", "Mustang"], ["year", 1964]];

console.log(fromListToObject(arr));
function fromListToObject(arr) {
 let newObject = {};
    for(let value of arr ){
        newObject[value[0]] = value[1];
    }
 return newObject;
//  Object.fromEntries(arr);
}
