//Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);

//Fucntions

//display city from web api after entering a zip code
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    
    //console.log(data);

    document.querySelector("city").innerHTML = data.city;
    document.querySelector("latitude").innerHTML = data.latitude;
    document.querySelector("longitude").innerHTML = data.longitude;
}

//display counties from web api based on the two-letter abreviation of a state
async function displayCounties(){
    
}