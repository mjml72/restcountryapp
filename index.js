const countryInput = document.getElementById("country-search");
const inputBtn = document.getElementById("search-btn");
const mainInfoDiv = document.getElementById("main-info");
const regionOption = document.getElementById("region");
const mode = document.getElementById("mode");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const moonsunText = document.getElementById("moon-sun-text");

mode.addEventListener("click", darkMode);
regionOption.addEventListener("change", searchContinent);
inputBtn.addEventListener("click", searchCountry);


async function searchContinent(event) {

    event.preventDefault();
    mainInfoDiv.innerHTML = "";
    let region = regionOption.value;

    try {
        let response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        let data = await response.json();
        showMoreCountries(data);
    } catch (error) {
        console.error(error);
    }
}



async function searchCountry(event) {

    event.preventDefault();
    mainInfoDiv.innerHTML = "";
    let country = countryInput.value;

    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        let data = await response.json();
        showCountry(data);
    } catch (error) {
        alert("Not Found. Try it again");
        console.error(error);
    }
}





function showMoreCountries(data) {

    regionOption.value = "";

    for (let i = 0; i < data.length; i++) {

        let countryDiv = document.createElement("div");
        countryDiv.classList.add("countrydiv");
        if(document.body.classList.contains("darkBackground")){
            countryDiv.classList.add("dark");
        }

        let bandera = document.createElement("img");
        bandera.src = data[i].flags.png;
        bandera.classList.add("infodivimg");
        countryDiv.appendChild(bandera);

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("infodiv");
        countryDiv.appendChild(infoDiv);

        let nombre = document.createElement("h3");
        nombre.innerHTML = data[i].name.common;
        infoDiv.appendChild(nombre);

        let capital = document.createElement("p");
        capital.innerHTML = `Capital: ${data[i].capital}`;
        infoDiv.appendChild(capital);

        let region = document.createElement("p");
        region.innerHTML = `Continent: ${data[i].region}`;
        infoDiv.appendChild(region);

        mainInfoDiv.appendChild(countryDiv);
    }

    for (let i = 0; i < mainInfoDiv.children.length; i++) {

        mainInfoDiv.children[i].addEventListener("click", ()=>{
            countryInput.value = data[i].name.common;
            
        });

        mainInfoDiv.children[i].addEventListener("click", searchCountry);
        
    }    
}




function showCountry(data) {

    countryInput.value = "";
    let oneCountry = document.createElement("div");
    oneCountry.classList.add("onecountry");

    if(document.body.classList.contains("darkBackground")){
        oneCountry.classList.add("dark");
    }

    let nombre = document.createElement("h3");
    nombre.innerHTML = data[0].name.common;
    oneCountry.appendChild(nombre);

    let imgDiv = document.createElement("div");   
    let flag = document.createElement("img");
    flag.src = data[0].flags.png;
    imgDiv.appendChild(flag);

    let info1 = document.createElement("div");



    let capital = document.createElement("p");
    capital.innerHTML = `Capital: ${data[0].capital}`;

    info1.appendChild(capital);

    let continente = document.createElement("p");
    continente.innerHTML = `Continent: ${data[0].region}`;
    info1.appendChild(continente);

    let region = document.createElement("p");
    region.innerHTML = `Region: ${data[0].subregion}`;
    info1.appendChild(region);


    let idiomas = document.createElement("p");
    idiomas.innerHTML = `Languages: `;
    for (const key in data[0].languages) {
        idiomas.innerHTML += " " + data[0].languages[key];
    }
    info1.appendChild(idiomas);


    let lat = document.createElement("p");
    lat.innerHTML = `Latitude: ${data[0].latlng[0]}`;
    info1.appendChild(lat);

    let lon = document.createElement("p");
    lon.innerHTML = `Longitude: ${data[0].latlng[1]}`;
    info1.appendChild(lon);

    let area = document.createElement("p");
    area.innerHTML = `Area: ${data[0].area}`;
    info1.appendChild(area);

    oneCountry.appendChild(imgDiv);
    oneCountry.appendChild(info1);

    mainInfoDiv.appendChild(oneCountry);

}




function darkMode() {

    sun.classList.toggle("hidden");
    moon.classList.toggle("hidden");
    moonsunText.textContent = moonsunText.textContent === "Light" ? "Dark" : "Light";

    document.body.classList.toggle("darkBackground");
    document.querySelector("header").classList.toggle("dark");
    inputBtn.classList.toggle("formbuttondark");

    regionOption.classList.toggle("dark");
    countryInput.classList.toggle("dark");

    for (const child of mainInfoDiv.children) {
        child.classList.toggle("dark");
    }

}

