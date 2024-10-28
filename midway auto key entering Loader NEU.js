// ==UserScript==
// @name         midway auto key entering Loader NEU
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Prompts for password on first use, then auto-fills and submits on midway-auth.amazon.com
// @author       Kanataza
// @match        https://midway-auth.amazon.com/*
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zur Passwortabfrage und -speicherung beim ersten Start
    function getPassword() {
        let password = localStorage.getItem('midway_password');

        // Wenn noch kein Passwort gespeichert ist, nachfragen und speichern
        if (!password) {
            password = prompt("Bitte geben Sie Ihr Passwort ein:");
            if (password) {
                localStorage.setItem('midway_password', password);
            } else {
                alert("Kein Passwort eingegeben. Das Skript kann nicht fortfahren.");
                return null;
            }
        }
        return password;
    }

    // Funktion zum automatischen Ausfüllen und Absenden des Formulars
    function autoFillAndSubmit() {
        // Passwort abrufen
        const password = getPassword();
        if (!password) return; // Falls kein Passwort, Skript abbrechen

        // Das Textfeld mit dem Namen 'password_field' suchen
        var passwordField = document.querySelector('input[name="password_field"]');
        if (passwordField) {
            // Das gespeicherte Passwort in das Textfeld einfügen
            passwordField.value = password;

            // Den Submit-Button suchen
            var submitButton = document.querySelector('#password_btn');
            if (submitButton) {
                // Realistischen Mausklick auf den Button simulieren
                submitButton.click();
            }
        }
    }

    // Skript ausführen, wenn die Seite geladen ist
    window.addEventListener('load', autoFillAndSubmit);
})();
