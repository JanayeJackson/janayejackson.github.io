//Event listeners
document.querySelector("#zip").addEventListener("change", displayCity());

//Fucntions

//display city from web api after entering a zip code
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}