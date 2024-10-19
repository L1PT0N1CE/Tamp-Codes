// ==UserScript==
// @name         APM Zeiten buchen ALT+4 Loader NEU
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Zeiten buchen alt+4
// @author       kanataza
// @match        https://eu1.eam.hxgnsmartcloud.com/*
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
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
        const storedEmployee = localStorage.getItem('lastSelectedEmployee') || 'kanataza';
        const storedHrswork = localStorage.getItem('lastSelectedHrswork') || '1';
        const storedDatework = localStorage.getItem('lastSelectedDatework') || '';

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

        // Make modal draggable
        $("#modal-dialog").draggable();

        // Fill booactivity field with default value
        fillBooactivity(defaultBooactivity);

        // Fill stored values
        $('#employee-select').val(storedEmployee);
        $('#hrswork-select').val(storedHrswork);
        $('#datework').val(storedDatework);

        // Set current date if storedDatework is empty
        if (storedDatework === '') {
            fillDatework();
        }

        // Handle click on submit button
        $("#submit-button").click(function() {
            submitForm();
        });

        // Handle click on close button
        $("#close-button").click(function() {
            $("#modal-dialog").remove(); // Remove modal dialog on close
        });

        // Handle click on booactivity 10 button
        $("#booactivity-10").click(function() {
            fillBooactivity(defaultBooactivity);
        });

        // Handle click on booactivity 11 button
        $("#booactivity-11").click(function() {
            fillBooactivity(altBooactivity);
        });
    }

    // Function to fill the booactivity field
    function fillBooactivity(value) {
        const booactivityField = $("input[name='booactivity']");
        if (booactivityField.length > 0) {
            booactivityField.val(value);
            booactivityField.focus(); // Focus on booactivity field
            booactivityField.trigger($.Event("keydown", { keyCode: 13 })); // Simulate Enter key press
        } else {
            console.warn("booactivityField nicht gefunden");
        }
    }

    // Function to fill the fields
    function fillFields(selectedEmployee, selectedHrswork, selectedOctype) {
        const employeeField = $("input[name='employee']");
        if (employeeField.length > 0) {
            employeeField.val(selectedEmployee);
        } else {
            console.warn("employeeField nicht gefunden");
        }

        const hrsworkField = $("input[name='hrswork']");
        if (hrsworkField.length > 0) {
            hrsworkField.val(selectedHrswork);
        } else {
            console.warn("hrsworkField nicht gefunden");
        }

        const octypeField = $("input[name='octype']");
        if (octypeField.length > 0) {
            octypeField.val(selectedOctype);
        } else {
            console.warn("octypeField nicht gefunden");
        }
    }

    // Function to submit the form
    function submitForm() {
        const selectedEmployee = $("#employee-select").val();
        const selectedHrswork = $("#hrswork-select").val();
        const selectedOctype = $("#octype-select").val();
        fillFields(selectedEmployee, selectedHrswork, selectedOctype);
        localStorage.setItem('lastSelectedEmployee', selectedEmployee);
        localStorage.setItem('lastSelectedHrswork', selectedHrswork);
        localStorage.setItem('lastSelectedOctype', selectedOctype);
        $("#modal-dialog").remove(); // Remove modal dialog after submission
    }

    // Call showModalDialog function when Alt+4 is pressed
    $(document).keydown(function(event) {
        if (event.altKey && event.which === 52) { // Alt+4
            // Check if modal dialog already exists
            if ($("#modal-dialog").length === 0) {
                showModalDialog();
            }
        }

        // If Enter key is pressed and modal dialog is open, simulate form submission
        if (event.which === 13 && $("#modal-dialog").length > 0) { // Enter key
            submitForm(); // Simulate form submission
        }
    });

    // Call fillDatework function initially
    fillDatework();

    // Set interval to update the datework field daily
    const interval = 24 * 60 * 60 * 1000; // 24 Stunden
    setInterval(fillDatework, interval);
});
