import './styles.css';
import './pnotifyStyles.css';
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";


import makeRequest from "./js/fetchCountries";
import countriesListTpl from "./templates/fewCountries.hbs"
import countryCardTpl from "./templates/oneCountry.hbs"
import { error, defaultModules } from'@pnotify/core';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

const debounce = require('lodash.debounce');

defaultModules.set(PNotifyMobile, {});

const refs = {
    "container": document.querySelector(".countries-container"),
    "inputBox": document.querySelector(".country-input"),
}

refs.inputBox.addEventListener("input", debounce(onInput, 500));
refs.container.addEventListener("click", onLinkClick);

function onInput(event) {
    resetContainer()
    const query = event.target.value;
    try {
        doSearch(query)
    } catch (error) {
        console.warn("Произошла ошибка: "+error.message)
    }
}

function onLinkClick(event) {
    event.preventDefault();
    const countryName = event.target.textContent;

    refs.inputBox.value = countryName;
    try {
        doSearch(countryName)
    } catch (error) {
        console.warn("Произошла ошибка: "+error.message)
    }
}

async function doSearch(name) {
    const countryList = await makeRequest(name);
    const dataLength = countryList.length;

    if (dataLength === 1) {
        makeOneCountrymarkup(countryList);
    } else if (dataLength < 11) {
        makeFewCountriesmarkup(countryList);
    } else if ((dataLength > 10)) {
        sendErrorMessage("There's too many results.", 'Please, do more specific search.');
    } else {
        sendErrorMessage("I didn't find anything.", 'Check if the name is written correctly.');
    }
    
}

function makeFewCountriesmarkup(data) {
    const markup = countriesListTpl(data);
    renewContainer(markup);
}

function makeOneCountrymarkup(data) {
    const markup = countryCardTpl(data);
    renewContainer(markup);
}

function renewContainer(markup) {
    refs.container.innerHTML = markup;
}

function resetContainer() {
    refs.container.innerHTML = "";
}

function sendErrorMessage(title, text) {
    error({
        title: title,
        text: text,
        type: 'error',
        delay: 3000,
        sticker: false,

    });
}