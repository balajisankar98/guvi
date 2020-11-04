
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
