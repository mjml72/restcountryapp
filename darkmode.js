import { inputBtn, countryInput, regionContainer, allBtn, mainInfoDiv } from "./index.js";
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const moonsunText = document.getElementById("moon-sun-text");

export function darkMode() {

    sun.classList.toggle("hidden");
    moon.classList.toggle("hidden");
    moonsunText.textContent = moonsunText.textContent === "Light" ? "Dark" : "Light";

    document.body.classList.toggle("darkBackground");
    document.querySelector("header").classList.toggle("dark");
    inputBtn.classList.toggle("dark");

    region.classList.toggle("dark");
    countryInput.classList.toggle("dark");
    regionContainer.classList.toggle("dark");
    allBtn.classList.toggle("dark");


    for (const child of mainInfoDiv.children) {
        child.classList.toggle("dark");
    }

}
