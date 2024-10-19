// ==UserScript==
// @name        APM Autofill Shiftreport list
// @version     0.1
// @description Füllt Textfelder mit vordefinierten Texten und dynamischen Vorschlägen basierend auf der Eingabe.
// @author      Kanataza
// @match       https://eu1.eam.hxgnsmartcloud.com/*
// @icon        https://media.licdn.com/dms/image/D4E03AQGYEWJAKzMoHg/profile-displayphoto-shrink_800_800/0/1675186919356?e=2147483647&v=beta&t=yD2lwHTC78Y0eFQGGpl173y2Rhv9LmZgCe6LKvLYFvI
// @grant       none
// ==/UserScript==

(function() {
  const texts = [
    "01 Safety Tip",
    "02 Success Story",
    "03 VDL Top Tech Issue",
    "04 Additional VDL Information",
    "05 AR Top Tech Issue",
    "06 AR Additional Information"
      ];

  function filterTexts(input) {
    return texts.filter(text => text.toLowerCase().startsWith(input.toLowerCase()));
  }

  function autofill(element) {
    const input = element.value;
    const filteredTexts = filterTexts(input);

    const datalistId = "autocomplete-suggestions";
    let dropdown = document.getElementById(datalistId);
    if (!dropdown) {
      dropdown = document.createElement("datalist");
      dropdown.id = datalistId;
      document.body.appendChild(dropdown);
    }
    dropdown.innerHTML = '';

    for (const text of filteredTexts) {
      const option = document.createElement("option");
      option.value = text;
      dropdown.appendChild(option);
    }

    element.setAttribute("list", datalistId);
  }

  function isTargetInput(element) {
    return element.getAttribute("name") === "wspf_10_com_descript";
  }

  function handleFocus(event) {
    const element = event.target;
    if (isTargetInput(element)) {
      autofill(element);
    }
  }

  document.addEventListener("focusin", handleFocus);
})();