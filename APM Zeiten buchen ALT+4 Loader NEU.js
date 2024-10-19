// ==UserScript==
// @name         APM Zeiten buchen ALT+4 Loader NEU
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Zeiten buchen alt+4
// @author       kanataza
// @match        https://eu1.eam.hxgnsmartcloud.com/*
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @grant        GM_addStyle
// ==/UserScript==

$(document).ready(function() {
    'use strict';

    // Define the default value for booactivity
    const defaultBooactivity = "10 - RME Technician/Sr Technician";
    const altBooactivity = "11 - RME Technician/Sr Technician";

    // Function to fill the datework field with today's date
    function fillDatework() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        const formattedDate = (day < 10 ? '0' : '') + day + "-" + month + "-" + year;

        const dateworkField = $("input[name='datework']");
        console.log("Überprüfe dateworkField...");
        console.log("dateworkField gefunden:", dateworkField);

        if (dateworkField.length > 0) {
            dateworkField.val(formattedDate);
            dateworkField.change(); // Trigger change event to notify UXDate of the change
        } else {
            console.warn("dateworkField nicht gefunden");
        }
    }

    // Function to create and display modal dialog
    function showModalDialog() {
        const modalContent = `
            <div id="modal-dialog" style="position: fixed; top: 50%; left: 20%; background-color: white; padding: 20px; border: 1px solid black; z-index: 9999;">
                <h2>Select options</h2>
                <label for="employee-select">Employee:</label>
                <select id="employee-select">
                    <option value="hesimonm">hesimonm</option>
                    <option value="rmalogor">rmalogor</option>
                    <option value="kanataza">kanataza</option>
                    <option value="ussaxel">ussaxel</option>
                    <option value="shalsami">shalsami</option>
                    <option value="arwiesne">arwiesne</option>
                    <option value="cancicek">cancicek</option>
                    <option value="chfgc">chfgc</option>
                    <option value="sprinoli">sprinoli</option>
                </select><br><br>
                <label for="hrswork-select">Hours of Work:</label>
                <select id="hrswork-select">
                    <option value="0,1">0,1</option>
                    <option value="0,25">0,25</option>
                    <option value="0,5">0,5</option>
                    <option value="0,75">0,75</option>
                    <option value="1">1</option>
                    <option value="1,5">1,5</option>
                    <option value="2">2</option>
                    <option value="2,5">2,5</option>
                    <option value="3">3</option>
                </select><br><br>
                <label for="datework">Date of Work:</label>
                <input type="text" id="datework" name="datework" class="uxdate" style="width: 150px;"><br><br>
                <label for="octype-select">Hourstype:</label>
                <select id="octype-select">
                    <option value="N">N</option>
                    <option value="O">O</option>
                </select><br><br>
                <button id="booactivity-10">Set Wo's</button>
                <button id="booactivity-11">Set FWO's</button><br><br>
                <button id="submit-button">Submit</button>
                <button id="close-button">Close</button>
            </div>
        `;
        $("body").append(modalContent);
        $("#modal-dialog").draggable();
        fillDatework();

        $("#submit-button").click(function() {
            $("#modal-dialog").remove();
        });

        $("#close-button").click(function() {
            $("#modal-dialog").remove();
        });

        $("#booactivity-10").click(function() {
            $("input[name='booactivity']").val(defaultBooactivity);
        });

        $("#booactivity-11").click(function() {
            $("input[name='booactivity']").val(altBooactivity);
        });
    }

    // Keydown event listener
    $(document).keydown(function(event) {
        if (event.altKey && event.which === 52) { // Alt+4
            showModalDialog();
            console.log("Alt+4 gedrückt, Dialog angezeigt.");
        }
    });
});
