// ==UserScript==
// @name         youtube downloader
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  youtube downloader for FDM with consistant download button
// @author       manoj joshi
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        #custom-download-button {
            height: 36px;
            width: auto;
            background: rgba(255,255,255,0.1);
            color: #f1f1f1;
            border-radius: 18px;
            border: none;
            font-size: 14px;
            padding: 0 16px;
            font-family: "Roboto", "Arial", sans-serif;
            font-weight: 500;
            margin-left: 8px;
            cursor: pointer;
        }

        #custom-download-button:hover {
            background-color: rgba(255,255,255,0.2);
        }
    `);

    function addCustomButton() {
        const container = document.querySelector('#flexible-item-buttons');
        if (!container) return;

        // Find the existing download button
        const downloadButton = container.querySelector('ytd-download-button-renderer');
        if (downloadButton){downloadButton.style.display = "none";}

        // Check if the custom button is already added
        if (document.querySelector('#custom-download-button')) {return;}

        // Create the custom button (styled similarly)
        const customButton = document.createElement('button');
              customButton.id = 'custom-download-button';
              customButton.textContent = "Download";


        // Add a click event to the custom button
        customButton.onclick = function() {
            alert("downloading video. . .");
        };

        container.insertBefore(customButton, downloadButton.nextSibling);
    }

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {addCustomButton();}
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    addCustomButton();
})();

