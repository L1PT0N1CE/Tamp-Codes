// ==UserScript==
// @name         tt correspondence alt+3 alt+4 Loader NEU
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofills ticket response and submits it on key press
// @author       You
// @match        https://t.corp.amazon.com/*
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zum Ausfüllen des Textfelds und Absenden der Antwort
    function fillAndSubmitResponse(responseText) {
        // Textfeld finden und ausfüllen
        var commentTextarea = $('#sim-communicationActions--createComment');
        commentTextarea.focus(); // Das Textfeld fokussieren
        document.execCommand('insertText', false, responseText); // Simulieren einer Benutzereingabe

        // Button finden und klicken
        var submitButton = $('.sim-communicationActions--addCommentButton');
        submitButton.click();
    }

    // Eventlistener für Tastendruck (Alt + 3)
    $(document).keydown(function(event) {
        if (event.altKey && event.keyCode === 51) { // 51 ist der Keycode für die Taste 3
            fillAndSubmitResponse("Hello, \nRME team received your ticket and will handle your request as soon as possible. \nBest regards.");
        }
    });

    // Eventlistener für Tastendruck (Alt + 4)
    $(document).keydown(function(event) {
        if (event.altKey && event.keyCode === 52) { // 52 ist der Keycode für die Taste 4
            fillAndSubmitResponse("The Station, Drive, Charger, Floor, Pod, Conveyance, Area, is operational again. \nBest regards.");
        }
    });
})();
