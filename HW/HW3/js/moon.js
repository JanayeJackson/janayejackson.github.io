createPage()
document.querySelector("#showZodiac").style.display = 'none';

//Functions
//creates moon page
function createPage(){
    const data = JSON.parse(localStorage.getItem("moonData"));
    console.log(data);

    if(data.eclipse.is_eclipse && data.eclipse.is_blood_moon){
        document.querySelector("#eclipse").innerHTML = " | Blood Moon Eclipse"; 
    } else if (data.eclipse.is_eclipse) {
        document.querySelector("#eclipse").innerHTML = " | Eclipse"; 
    }

    if(data.special_moon.labels.length > 0){
        document.querySelector("#specialMoon").innerHTML = ` | ${data.special_moon.labels[0]}`;
    }

    document.querySelector("#moonSVG").innerHTML = data.moon_visual.svg;
    document.querySelector("#moonTitle").innerHTML = data.interpretation.title;
    document.querySelector("#moonAge").innerHTML = data.phase.age_days;
    document.querySelector("#interpBody").innerHTML = data.interpretation.body;
    document.querySelector("#fullMoon").innerHTML = `Days until Full Moon: ${data.forecast.days_until_full_moon}`;
    document.querySelector("#newMoon").innerHTML = `Days until New Moon: ${data.forecast.days_until_new_moon}`;
    document.querySelector("#nextEclipse").innerHTML = `Days until next Eclipse: ${data.forecast.next_eclipse.days_until}`;
    document.querySelector("#nextSpecial").innerHTML = `Days until next Special Moon: ${data.forecast.next_special_moon.days_until}`;

    let newMoon = formatDate(data.next_phases.new_moon);
    let firstQuart = formatDate(data.next_phases.first_quarter);
    let fullMoon = formatDate(data.next_phases.full_moon);
    let lastQuart = formatDate(data.next_phases.last_quarter);
    
    document.querySelector("#nextPhases").innerHTML = ` Next New Moon: ${newMoon} <br>
                                                        Next First Quarter: ${firstQuart} <br>
                                                        Next Full Moon: ${fullMoon} <br>
                                                        Next Last Quarter: ${lastQuart} <br>`;

    if(data.zodiac){
        document.querySelector("#zodiac").innerHTML = `${data.zodiac.sign}`;
        document.querySelector("#showZodiac").style.display = "";
    }

}

function formatDate(dateStr) {
    let date = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
    