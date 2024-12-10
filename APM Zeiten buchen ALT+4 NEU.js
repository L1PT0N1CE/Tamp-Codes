// ==UserScript==
// @name         APM Zeiten buchen ALT+4 NEU
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Zeiten buchen alt+4
// @author       kanataza
// @match        https://eu1.eam.hxgnsmartcloud.com/*
// @icon         https://media.licdn.com/dms/image/v2/D4E03AQEkSQG-ayth3g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730057709648?e=1735776000&v=beta&t=hY0VgEQY-JSZky20qE6dY1SJb781Bi9ysJ5mUPdc1uI
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Sicherstellen, dass jQuery verfügbar ist
    const $ = jQuery.noConflict(true);

    const defaultBooactivity = "10 - RME Technician/Sr Technician";
    const altBooactivity = "11 - RME Technician/Sr Technician";

    function fillDatework() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        const formattedDate = (day < 10 ? '0' : '') + day + "-" + month + "-" + year;

        const dateworkField = $("input[name='datework']");
        if (dateworkField.length > 0) {
            dateworkField.val(formattedDate);
            dateworkField.change();
        }
    }

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
                    <option value="ivelik">ivelik</option>
                    <option value="daldalci">daldalci</option>
                    <option value="klikevi">klikevi</option>
                    <option value="chrklei">chrklei</option>
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
        fillBooactivity(defaultBooactivity);

        $('#employee-select').val(storedEmployee);
        $('#hrswork-select').val(storedHrswork);
        $('#datework').val(storedDatework);

        if (storedDatework === '') {
            fillDatework();
        }

        $("#submit-button").click(function() {
            submitForm();
        });

        $("#close-button").click(function() {
            $("#modal-dialog").remove();
        });

        $("#booactivity-10").click(function() {
            fillBooactivity(defaultBooactivity);
        });

        $("#booactivity-11").click(function() {
            fillBooactivity(altBooactivity);
        });
    }

    function fillBooactivity(value) {
        const booactivityField = $("input[name='booactivity']");
        if (booactivityField.length > 0) {
            booactivityField.val(value);
            booactivityField.focus();
            booactivityField.trigger($.Event("keydown", { keyCode: 13 }));
        }
    }

    function fillFields(selectedEmployee, selectedHrswork, selectedOctype) {
        const employeeField = $("input[name='employee']");
        if (employeeField.length > 0) {
            employeeField.val(selectedEmployee);
        }

        const hrsworkField = $("input[name='hrswork']");
        if (hrsworkField.length > 0) {
            hrsworkField.val(selectedHrswork);
        }

        const octypeField = $("input[name='octype']");
        if (octypeField.length > 0) {
            octypeField.val(selectedOctype);
        }
    }

    function submitForm() {
        const selectedEmployee = $("#employee-select").val();
        const selectedHrswork = $("#hrswork-select").val();
        const selectedOctype = $("#octype-select").val();
        fillFields(selectedEmployee, selectedHrswork, selectedOctype);
        localStorage.setItem('lastSelectedEmployee', selectedEmployee);
        localStorage.setItem('lastSelectedHrswork', selectedHrswork);
        localStorage.setItem('lastSelectedOctype', selectedOctype);
        $("#modal-dialog").remove();
    }

    $(document).keydown(function(event) {
        if (event.altKey && event.which === 52) {
            if ($("#modal-dialog").length === 0) {
                showModalDialog();
            }
        }

        if (event.which === 13 && $("#modal-dialog").length > 0) {
            submitForm();
        }
    });

    fillDatework();
    const interval = 24 * 60 * 60 * 1000;
    setInterval(fillDatework, interval);

})();
