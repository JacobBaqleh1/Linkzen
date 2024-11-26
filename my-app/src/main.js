// src/main.js

// Import necessary modules (if any)
// const someModule = require('some-module');

// Function to initialize the application
// Function to add links to a specified element

function initialize() {
    console.log('DOM fully loaded and parsed');
    // Add any additional initialization logic here
}
function addLinks(elementId, links) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        element.appendChild(a);
        element.appendChild(document.createElement('br')); // Add a line break after each link
    });
}
// Function to add a profile picture to a specified element
function addProfilePicture(elementId, imageUrl, altText) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    element.appendChild(img);
}

// Function to finalize and publish the content
function finalizeAndPublish(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.addEventListener('click', function() {
        console.log('Content finalized and published');
        // Add any additional logic to finalize and publish the content here
    });
    element.appendChild(button);
}

// Function to add a username to a specified element
function changeProfilePicture(elementId, newImageUrl, newAltText) {
    function addLogoutButton(elementId, buttonText) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with id ${elementId} not found`);
            return;
        }

        const button = document.createElement('button');
        button.textContent = buttonText;
        button.addEventListener('click', function() {
            console.log('User logged out');
            // Add any additional logout logic here
        });
        element.appendChild(button);
    }
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const img = element.querySelector('img');
    if (!img) {
        console.error(`No image found in element with id ${elementId}`);
        return;
    }

    img.src = newImageUrl;
    img.alt = newAltText;
}
function addUsername(elementId, username) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const span = document.createElement('span');
    span.textContent = username;
    element.appendChild(span);
}

function init() {
    console.log('Application initialized');
    
    // Add event listener to the button
    document.getElementById('changeText').addEventListener('click', function() {
        document.querySelector('h1').textContent = 'Text Changed!';
    });
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', init);