
// Parsing a list and transform the first and last elements of it:
let arr = ["GUVI", "I", "am", "a geek"];
console.log(transformFirstAndLast(arr));
function transformFirstAndLast(arr) {
 let newObject = {};
 newObject[arr.shift()] = arr.pop();
 return newObject;
}
