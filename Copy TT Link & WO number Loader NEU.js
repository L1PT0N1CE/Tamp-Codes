// ==UserScript==
// @name         Copy TT Link & WO number Loader NEU
// @namespace    kanataza & ??
// @version      0.3
// @description  Copies the title and URL or only the work order number of a ticket to the clipboard for easy pasting in Chime, APM, etc.
// @author       Azad Kanat <kanataza@amazon.com>
// @match        http*://t.corp.amazon.com/*
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @run-at       document-end
// @grant        GM_setClipboard

// ==/UserScript==

(function() {
    'use strict';

    // Function to copy title and URL
    function copyTitleAndURL() {
        var text = document.getElementsByClassName('title-container')[0].children[0].innerText + ' (' + document.URL + ')';
        GM_setClipboard(text, 'text');
        var button = document.getElementById('tcopybutton');
        button.setAttribute('title', 'Copied title and URL to your clipboard!!');
        button.style.backgroundColor = 'yellow'; // Change button color to yellow
    }

    // Function to copy only work order number
    function copyWorkOrderNumber() {
        var workOrderText = document.body.textContent;
        var workOrderMatch = workOrderText.match(/Work order is created for this ticket with EAM\(APM\) work order number: (\d+)/);
        if(workOrderMatch && workOrderMatch.length > 1) {
            var workOrderNumber = workOrderMatch[1];
            GM_setClipboard(workOrderNumber, 'text');
            var button = document.getElementById('wocopybutton');
            button.setAttribute('title', 'Copied work order number to your clipboard!!');
            button.style.backgroundColor = 'yellow'; // Change button color to yellow
        } else {
            console.log('Work order number not found.');
        }
    }

    setInterval(function(){
        // We need to use the timeout function because the call to load information is made asynchronously and
        // the information is not available when the DOM is ready.

        // Greasemonkey scripts only run once during the entire time a tab is open (even if the page is refreshed)
        if(document.getElementById('tcopybutton') || document.getElementById('wocopybutton')) {
            console.log('Buttons already exist');
            return;
        }

        var interactiveButtons = document.getElementsByClassName('interaction-buttons');
        if(interactiveButtons.length > 0) {
            console.log('Adding copy buttons');

            // Create button to copy title and URL
            var titleURLButton = document.createElement('button');
            titleURLButton.appendChild(document.createTextNode('Copy Title & URL'));
            titleURLButton.setAttribute('class', 'awsui-button awsui-button-variant-normal awsui-hover-child-icons');
            titleURLButton.setAttribute('id', 'tcopybutton');
            titleURLButton.addEventListener('click', copyTitleAndURL, false);

            // Create button to copy work order number
            var workOrderButton = document.createElement('button');
            workOrderButton.appendChild(document.createTextNode('Copy Work Order'));
            workOrderButton.setAttribute('class', 'awsui-button awsui-button-variant-normal awsui-hover-child-icons');
            workOrderButton.setAttribute('id', 'wocopybutton');
            workOrderButton.addEventListener('click', copyWorkOrderNumber, false);

            // Create div to hold both buttons
            var div = document.createElement('div');
            div.setAttribute('class', 'edit-issue');
            div.appendChild(titleURLButton);
            div.appendChild(workOrderButton);

            interactiveButtons[0].insertBefore(div, interactiveButtons[0].firstChild);
        }

    }, 3000);
})();
