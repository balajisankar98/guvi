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
