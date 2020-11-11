// Return all the palindromes in an array
const isPalindrome = (element)=>{
    for(let i = 0 ; i < element.length/2 ; i++){
        if(element.charAt(i) !== element.charAt(element.length - 1 - i))
            return false
    }
    return true;
}

let arr = (function(arr){
    return arr.filter(isPalindrome);
})(["NaN","malayalam","qwerty"]);

console.log(arr);