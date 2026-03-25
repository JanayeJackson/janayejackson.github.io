//Event listeners
document.querySelector("#zip").addEventListener("change", setCity);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#retypePass").addEventListener("change", checkPassword);
document.querySelector("#infoForm").addEventListener("submit", submitForm);


//Global variables 
var userCity = "";
var passValid = true;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

//Fucntions
listState();
addMonthDays();

//set the days and months for the user form
async function addMonthDays(){
    let month = document.querySelector("#month");
    let day = document.querySelector("#day");
    month.innerHTML = "<option> Month </option>";
    day.innerHTML = "<option> Day </option>";

    for(let i = 1; i <= 31; i++){
        day.innerHTML += `<option value=${i}>${i}</option>`;
    }
    for(let i = 0; i < 12; i++){
        month.innerHTML += `<option value=${i + 1}>${months[i]}</option>`;
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

// List all of the states in california
async function listState(){
    let states = document.querySelector("#state");
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    states.innerHTML = "<option> Select State </option>";
    for (let i of data) {
        states.innerHTML += `<option value=${i.usps}>${i.state}</option>`;
    } 

}

//format dob to pass as parameter
function getDOB(){
    let month = document.querySelector("#month").value; 
    let day = document.querySelector("#day").value;
    let year = document.querySelector("[name='year']").value;
    let dob = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T13:00:00+00:00`;
    return dob;
}

// Get parameters to pass to api and then display data with new page
async function getPageData(){
    const params = setParams();

    let url = `https://api.freeastroapi.com/api/v1/moon/phase?${params.toString()}`;
    
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': '61c59e00abf84f786e81e055f12bb26f6d04345399c611898381b43c85c12403'
        }
    });
    
    let data = await response.json();
    console.log(data);

    localStorage.setItem("moonData", JSON.stringify(data));
    window.location.href = "moon.html";
}

//set city based on zipcode
async function setCity(){
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    
    if(!data){
        document.querySelector("#zipError").innerHTML = "Zip code not found";
    } else {
        userCity = data.city;
    }
}

//set url parameters for api
function setParams(){
    let dob = getDOB();
    let zodiac = false;
    let rise_set = false;

    if(userCity.length != 0){
        rise_set = true;
    }

    if (document.querySelector("#zodiac").checked) {
        zodiac = true;
    }

    const params = new URLSearchParams({
        city: userCity,
        date: dob,
        include_eclipse: true,
        include_forecast: true,
        include_interpretation: true,
        include_rise_set: rise_set,
        include_special: true,
        include_visuals: true,
        include_zodiac: zodiac
        });
        
    return params;
}

//Validate then submit form data
async function submitForm(e){
    e.preventDefault();

    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let month = document.querySelector("#month").value; 
    let day = document.querySelector("#day").value;
    let year = document.querySelector("[name='year']").value;

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
    if(month.length == 0 || day.length == 0 || year.length == 0){
        document.querySelector("#dobError").innerHTML = "Month, Day, and Year Required!";
        document.querySelector("dobError").style.color = "red";
        isValid = false;
    }

    if(!isValid || !passValid){
        
        return;
    }

    await getPageData();
}


