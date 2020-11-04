let obj = {name : "RajiniKanth", age : 33, hasPets : false};
//    Parsing an JSON object’s Values:
   console.log(printAllValues(obj))
   
//    Parsing an JSON object’s Keys:
   console.log(printAllKeys(obj))

//    Parsing an JSON object and convert it to a list:
   console.log(convertListToObject(obj))
   
   function printAllValues(obj) {
       let values = []
        for(let key in obj){
            values.push(obj[key]);
        }
        return values;
    // return Object.values(obj);
   }

   function printAllKeys(obj) {
        let keys = []
        for(let key in obj){
            keys.push(key);
        }
        return keys;
    // return Object.keys(obj);
   }

   function convertListToObject(obj) {
        let arrList = []
        for(let key in obj){
            let arr = []
            arr.push(key);
            arr.push(obj[key]);
            arrList.push(arr);
        }
        return arrList;
    // return Object.entries(obj);
   }