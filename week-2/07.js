// Return all the palindromes in an array

let arr = (function(arr,rotate){
    let arrLength = arr.length;
    if(rotate > arrLength)
        rotate = rotate % arrLength;

    return arr.splice(arrLength- rotate ,arrLength).concat(arr);
})([1,2,3,4,5,6] , 11)

console.log(arr);