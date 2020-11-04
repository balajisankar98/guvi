

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
