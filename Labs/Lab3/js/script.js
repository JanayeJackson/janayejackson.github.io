//Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#retypePass").addEventListener("change", checkPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});


//Global variables 
var userValid = true;
var passValid = true;

//Fucntions

//display city from web api after entering a zip code
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    
    //console.log(data);
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;

}

//display counties from web api based on the two-letter abreviation of a state
async function displayCounties(){
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i of data) {
        countyList.innerHTML += `<option>${i.county}</option>`;
    } 
}

//check availabilty of username
async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();

    if(!data.available){
        document.querySelector("#userAlert").innerHTML = `${username} is unavailable`;
        document.querySelector("#userAlert").style.color = "red";
        userValid = false;
    } else {
        document.querySelector("#userAlert").innerHTML = `${username} is available`;
        document.querySelector("#userAlert").style.color = "green";
        userValid = true;
    }
}

//check passwords
function checkPassword(){
    let passwordError = document.querySelector("#passwordError");
    let password = document.querySelector("#password").value;
    let retypePass = document.querySelector("#retypePass").value;
    passwordError.innerHTML = "";
    passValid = true

    if(password.length < 6){
        passwordError.innerHTML = "Password needs to be atleast 6 characters!";
        passwordError.style.color = "red";
        passValid = false;
    } else {
        if(password != retypePass || retypePass.length == 0){
            passwordError.innerHTML = "Passwords do not match";
            passwordError.style.color = "red";
            passValid = false;
        } 
    }
}

//validating form data
function validateForm(e){
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if(username.length == 0){
        document.querySelector("#userAlert").innerHTML = "Username Required!";
        document.querySelector("#userAlert").style.color = "red";
        isValid = false;
    }
    if(password.length == 0){
        document.querySelector("#passwordError").innerHTML = "Password Required!";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }

    if(!isValid || !passValid || !userValid){
        e.preventDefault();
        return;
    }
    
}