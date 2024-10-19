// ==UserScript==
// @name         APM Button Loader Neu
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Kopiert Texte aus problemcode, failurecode, causecode in description und macht den Button beweglich ohne seine Größe zu verändern
// @author       KANATAZA
// @match        https://eu1.eam.hxgnsmartcloud.com/*
// @grant        none
// @icon         https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI

// ==/UserScript==

(function() {
    'use strict';

    // Function to make an element draggable
    function makeDraggable(element) {
        var isDragging = false;
        var offsetX, offsetY;

        element.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            document.body.style.cursor = 'move';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                // Ensure button size does not change by updating only top and left
                element.style.left = (e.clientX - offsetX) + 'px';
                element.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = 'default';
                // Save the position in localStorage
                localStorage.setItem('buttonPos', JSON.stringify({top: element.style.top, left: element.style.left}));
            }
        });
    }

    window.addEventListener('load', function() {
        var button = document.createElement('button');
        button.innerText = 'FWO';
        button.style.position = 'fixed';
        button.style.zIndex = '1000';
        button.style.width = '100px';  // Set explicit width
        button.style.height = '30px';  // Set explicit height
        button.style.overflow = 'hidden'; // Prevent content overflow

        // Load position from localStorage
        var savedPos = JSON.parse(localStorage.getItem('buttonPos'));
        if (savedPos) {
            button.style.top = savedPos.top;
            button.style.left = savedPos.left;
        } else {
            button.style.top = '10px';
            button.style.left = '10px';
        }

        document.body.appendChild(button);

        makeDraggable(button);

        button.addEventListener('click', function() {
            var problemCodeField = document.querySelector('input[name="problemcode"]');
            var failureCodeField = document.querySelector('input[name="failurecode"]');
            var causeCodeField = document.querySelector('input[name="causecode"]');
            var descriptionField = document.querySelector('input[name="description"]');

            if (problemCodeField && failureCodeField && causeCodeField && descriptionField) {
                var problemCode = problemCodeField.value;
                var failureCode = failureCodeField.value;
                var causeCode = causeCodeField.value;

                descriptionField.value = `[${problemCode}][${failureCode}][${causeCode}]`;
            } else {
                console.log('Ein oder mehrere Textfelder wurden nicht gefunden.');
            }
        });
    });
})();
