// Playing with JSON object"s Values:
let cat = {
    name: "Fluffy",
    activities: ["play", "eat cat food"],
    catFriends: [
    {
    name: "bar",
    activities: ["be grumpy", "eat bread omblet"],
    weight: 8,
    furcolor: "white"
    }, 
    {
    name: "foo",
    activities: ["sleep", "pre-sleep naps"],
    weight: 3
    }
    ]
}
// Add height and weight to Fluffy
cat.height = "1 ft";
cat.weight = "10 kg";

// Fluffy name is spelled wrongly. Update it to Fluffyy
// Print the catFriends names.

cat.name = "Fluffyy";
let totalActivities = [];
let totalWeight = 0;

totalActivities = totalActivities.concat(cat.activities);
for(let catFriend of cat.catFriends){
    console.log("name => "+catFriend.name);
    console.log("activities =>"+catFriend.activities.join(","));
    totalWeight+=catFriend.weight;
    totalActivities = totalActivities.concat(catFriend.activities);
}

// Print the total weight of catFriends
console.log("totalWeight => "+totalWeight)

// Print the total activities of all cats (op:6)
console.log(totalActivities.join(","))

for(let catFriend of cat.catFriends){
    catFriend.activities.push("drink water");
    catFriend.activities.push("be lazy");
    if(catFriend.name === "bar"){
        catFriend.furcolor = "black";
    }
}

let myCar = {
    make: "Bugatti",
    model: "Bugatti La Voiture Noire",
    year: 2019,
    accidents: [
    {
    date: "3/15/2019",
    damage_points: "5000",
    atFaultForAccident: true
    },
    {
    date: "7/4/2022",
    damage_points: "2200",
    atFaultForAccident: true
    },
    {
    date: "6/22/2021",
    damage_points: "7900",
    atFaultForAccident: true
    }
    ]
   }
//Loop over the accidents array. Change atFaultForAccident from true to false.
// Print the dated of my accidents
   for(let accident of myCar.accidents){
       accident.atFaultForAccident = false;
       console.log(accident.date)
   }

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
// Parsing a list and transform the first and last elements of it:
   let arr = ["GUVI", "I", "am", "a geek"];
   console.log(transformFirstAndLast(arr));
function transformFirstAndLast(arr) {
    let newObject = {};
    newObject[arr.shift()] = arr.pop();
    return newObject;
}

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

// Parsing two JSON objects and Compare:
let expected = {foo: 5, bar: 11};
let actual = {foo: 5, bar: 6}
console.log(assertObjectsEqual(expected,actual,"detects that two objects are equal"));
function assertObjectsEqual(actual, expected, testName){
    let result = true;
    for(let key in expected){
        if(expected[key] !== actual[key]){
            result = false;
            break;
        }
    }
    if(result){
        return "Passed";
    }
    else{
        return "FAILED [my test] Expected "+JSON.stringify(expected)+", but got "+JSON.stringify(actual);
    }
}


// Parsing JSON objects and Compare:
let securityQuestions = [
    {
    question: "What was your first pet’s name?",
    expectedAnswer: "FlufferNutter"
    },
    {
    question: "What was the model year of your first car?",
    expectedAnswer: "1985"
    },
    {
    question: "What city were you born in?",
    expectedAnswer: "NYC"
    }
   ]
   function chksecurityQuestions(securityQuestions,question,ans) {
        for(let quest of securityQuestions){
            if(quest["question"] === question){
                if(quest["expectedAnswer"] === ans)
                    return true;
                else
                    return false;
            }
        }
    return true; 
   }
   //Test case1:
   let ques = "What was your first pet’s name?";
   let ans  =  "FlufferNutter";
   let status = chksecurityQuestions(securityQuestions, ques, ans);
   console.log(status); // true
   //Test case2:
   ques = "What was your first pet’s name?";
   ans  =  "DufferNutter";
   status = chksecurityQuestions(securityQuestions, ques, ans);
   console.log(status); // flase

//    Parsing JSON objects and Compare:
   var students = [
    {
    name: "Siddharth Abhimanyu", age: 21}, { name: "Malar", age: 25},
    {name: "Maari",age: 18},{name: "Bhallala Deva",age: 17},
    {name: "Baahubali",age: 16},{name: "AAK chandran",age: 23},   {name:"Gabbar Singh",age: 33},{name: "Mogambo",age: 53},
    {name: "Munnabhai",age: 40},{name: "Sher Khan",age: 20},
    {name: "Chulbul Pandey",age: 19},{name: "Anthony",age: 28},
    {name: "Devdas",age: 56} 
    ];
   function returnMinors(arr)
   {
       let minorStudents = []
       for(let student of students){
            if(student.age < 20){
                minorStudents.push(student.name);
            }
       }
       return minorStudents;
   }
   console.log(returnMinors(students));