//Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);
document.querySelector("#q5").addEventListener("input", () => {
    document.querySelector("#value5").innerHTML = document.querySelector("#q5").value;
})
document.querySelector("#q10").addEventListener("input", () => {
    document.querySelector("#value10").innerHTML = document.querySelector("#q10").value;
})

//Global Variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");
let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
let q9ChoicesArray = ["New Jersey", "California", "Florida", "Louisiana"];

//Initialize q4 questions
displayChoices();

//Functions
function displayChoices(){
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    q9ChoicesArray = _.shuffle(q9ChoicesArray);
    for(let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id="${q4ChoicesArray[i]}"
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
    for(let i = 0; i < q9ChoicesArray.length; i++){
        document.querySelector("#q9Choices").innerHTML += `<input type="radio" name="q9" id="${q9ChoicesArray[i]}"
            value="${q9ChoicesArray[i]}"> <label for="${q9ChoicesArray[i]}"> ${q9ChoicesArray[i]}</label>`;
    }
}
function isFormValid(index){
    let isValid = true;
    if(index == 4 || index == 9){
        if(!document.querySelector(`input[name=q${index}]:checked`)){
            isValid = false;
            document.querySelector("#validationFdbk").innerHTML =`Question ${index} was not answered`;
        }
    } else {
        if(document.querySelector(`#q${index}`).value == ""){
            isValid = false;
            document.querySelector("#validationFdbk").innerHTML =`Question ${index} was not answered`;
        }
    }
    return isValid;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "feedback-box bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score+= 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "feedback-box bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = "";
    for(let i = 1; i <= 10; i++){
        if(i == 3 || i == 8 ){
            continue;
        }
        if(!isFormValid(i)){
            return;
        }

    }
    
    //local variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    let q7Response = document.querySelector("#q7").value;
    let q9Response = document.querySelector("input[name=q9]:checked").value;
    let q10Response = document.querySelector("#q10").value;

    //Grading 1st question
    if(q1Response == "sacramento"){
        rightAnswer(1)
    } else {
        wrongAnswer(1)
    }

    //Grading 2nd question
    if(q2Response == "mo"){
        rightAnswer(2)
    } else {
        wrongAnswer(2)
    }

    //Grading 3rd question
    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && 
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked){
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    //Grading 4th question
    if(q4Response == "Rhode Island"){
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    if(q5Response == 1850){
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    //Grading 6th question
    if(q6Response == "california"){
        rightAnswer(6)
    } else {
        wrongAnswer(6)
    }

    //Grading 7th question
    if(q7Response == "CA"){
        rightAnswer(7)
    } else {
        wrongAnswer(7)
    }

    //Grading 8th question
    if(document.querySelector("#KS").checked && document.querySelector("#IL").checked && 
        !document.querySelector("#OH").checked && !document.querySelector("#NY").checked){
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    //Grading 9th question
    if(q9Response == "Florida"){
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    if(q10Response == 6){
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    if(score >= 80){
        document.querySelector("#pass").innerHTML = "Congrats you Passed!!";
    } else {
        document.querySelector("#pass").innerHTML = "";
    }
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}