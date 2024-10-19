// ==UserScript==
// @name         Auto Activation Clicker activate.amazon-corp Loader NEU
// @version      1.0
// @description  Automatisches Klicken auf "From my own device" und "I have the device" nach Code-Eingabe
// @author       @kanataza
// @match        https://activate.amazon-corp.com/*
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    function clickFirstButton() {
        const firstButton = [...document.querySelectorAll('button')].find(btn => btn.textContent.includes("From my own device"));
        if (firstButton) {
            console.log("Klicke auf den ersten Button: From my own device");
            firstButton.click();


            setTimeout(clickSecondButton, 1000);
        } else {
            console.log("Erster Button noch nicht verfügbar, überprüfe erneut...");
            setTimeout(clickFirstButton, 1000);
        }
    }


    function clickSecondButton() {
        const secondButton = [...document.querySelectorAll('button')].find(btn => btn.textContent.includes("I have the device"));
        if (secondButton) {
            console.log("Klicke auf den zweiten Button: I have the device");
            secondButton.click();


            setTimeout(clickConfirmButton, 1000);
        } else {
            console.log("Zweiter Button noch nicht verfügbar, überprüfe erneut...");
            setTimeout(clickSecondButton, 1000);
        }
    }


    function clickConfirmButton() {
        const confirmButton = document.querySelector('#confirm-button-3');
        if (confirmButton) {
            console.log("Klicke auf den Confirm-Button");
            confirmButton.click();
        } else {
            console.log("Confirm-Button noch nicht verfügbar, überprüfe erneut...");
            setTimeout(clickConfirmButton, 1000);
        }
    }


    clickFirstButton();
})();