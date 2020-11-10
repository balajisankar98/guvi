// Convert all the strings to title caps in a string array 
let arr = ['hello','there!','how','are','you?'].map(element=> element.charAt(0).toUpperCase()+element.slice(1,element.length));

console.log(arr);