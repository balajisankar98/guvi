// Remove duplicates from an array
let arr = [1,1,2,3,4,5,5,6,6,6,6].reduce((arr,num)=> {
    if(arr.includes(num)) 
        return arr;
    arr.push(num);
    return arr;
},[]);
console.log(arr);