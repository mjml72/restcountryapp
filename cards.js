import { mainInfoDiv, searchCountry } from "./index.js";

export function showCountry(data) {

    let oneCountry = document.createElement("div");
    oneCountry.classList.add("onecountry");

    if(document.body.classList.contains("darkBackground")){
        oneCountry.classList.add("dark");
    }

    let nombre = document.createElement("h3");
    nombre.innerText = data[0].name.common;
    oneCountry.appendChild(nombre);

    let imgDiv = document.createElement("div");   
    let flag = document.createElement("img");
    flag.src = data[0].flags.png;
    imgDiv.appendChild(flag);

    let info1 = document.createElement("div");

    let capital = document.createElement("p");
    capital.innerText = `Capital: ${data[0].capital}`;

    info1.appendChild(capital);

    let continente = document.createElement("p");
    continente.innerText = `Continent: ${data[0].region}`;
    info1.appendChild(continente);

    let region = document.createElement("p");
    region.innerText = `Region: ${data[0].subregion}`;
    info1.appendChild(region);


    let idiomas = document.createElement("p");
    idiomas.innerText = `Languages: `;

    for (const key in data[0].languages) {
        idiomas.innerText += " " + data[0].languages[key];
    }

    info1.appendChild(idiomas);


    let lat = document.createElement("p");
    lat.innerText = `Latitude: ${data[0].latlng[0]}`;
    info1.appendChild(lat);

    let lon = document.createElement("p");
    lon.innerText = `Longitude: ${data[0].latlng[1]}`;
    info1.appendChild(lon);

    let area = document.createElement("p");
    area.innerText = `Area: ${data[0].area}`;
    info1.appendChild(area);

    oneCountry.appendChild(imgDiv);
    oneCountry.appendChild(info1);

    mainInfoDiv.appendChild(oneCountry);

}

export function showMoreCountries(data) {

    data = data.sort((a, b) => {
        if(a.name.common < b.name.common){
            return -1;
        }
    });

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
        nombre.innerText = data[i].name.common;
        infoDiv.appendChild(nombre);

        let capital = document.createElement("p");
        capital.innerText = `Capital: ${data[i].capital}`;
        infoDiv.appendChild(capital);

        let region = document.createElement("p");
        region.innerText = `Continent: ${data[i].region}`;
        infoDiv.appendChild(region);

        mainInfoDiv.appendChild(countryDiv);
    }

    for (let i = 0; i < mainInfoDiv.children.length; i++) {

        mainInfoDiv.children[i].addEventListener("click", ()=>{
            let country = data[i].name.common;

            searchCountry(country);
        });

    }    
}
