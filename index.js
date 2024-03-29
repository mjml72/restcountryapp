import { darkMode } from "./darkmode.js";
import { showCountry, showMoreCountries } from "./cards.js";


export const countryInput = document.getElementById("country-search");
export const inputBtn = document.getElementById("search-btn");
export const mainInfoDiv = document.getElementById("main-info");
const region = document.getElementById("region");
export const regionContainer = document.getElementById("region-container");
const continent = document.getElementsByClassName("continent");
const mode = document.getElementById("mode");
export const allBtn = document.getElementById("all");

allBtn.addEventListener("click", fetchAll);
mode.addEventListener("click", darkMode);
window.addEventListener("load", fetchAll);


async function fetchAll() {

    mainInfoDiv.innerText = "";

    try {
        let response = await fetch("https://restcountries.com/v3.1/all?fields=flags,name,capital,region");

        let data = await response.json();

        showMoreCountries(data);

    } catch (error) {
        console.error(error);
    }
}


region.addEventListener("click", function () {
    regionContainer.classList.toggle("show");
});

for (let i = 0; i < continent.length; i++) {
    continent[i].addEventListener("click", searchContinent);
}

inputBtn.addEventListener("click", (event) => {

    event.preventDefault();
    let country = countryInput.value;
    searchCountry(country);
    countryInput.value = "";

});


async function searchContinent(event) {

    let regionContinent = event.target.textContent;
    countryInput.value = "";
    event.preventDefault();
    mainInfoDiv.innerText = "";

    try {

        let response = await fetch(`https://restcountries.com/v3.1/region/${regionContinent}`);
        let data = await response.json();
        showMoreCountries(data);

    } catch (error) {

        console.error(error);
    }
}


function notFound(texto) {
    let message = document.createElement("div");
    message.classList.add("message");

    if (document.body.classList.contains("darkBackground")) {
        message.classList.add("dark");
    }

    let text = document.createElement("h4");
    text.innerText = texto;
    message.appendChild(text);
    mainInfoDiv.appendChild(message);
}


export async function searchCountry(country) {

    regionContainer.classList.remove("show");
    mainInfoDiv.innerText = "";

    try {
        let response;
        response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (response.status !== 200) {
            response = await fetch(`https://restcountries.com/v3.1/translation/${country}`);
            if (response.status !== 200) {
                throw "Not Found. Try it Again!";
            }
        }
        let data = await response.json();
        showCountry(data);




    } catch (error) {

        console.error(error);
        notFound(error);
    }

}














