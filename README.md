# Alex Egerev's Planner Refactor Webpage

[insert images here]

## Description

This website was created as a way for people to keep track of what they have to do in their lives. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Deployment](#deployment)

## Installation

No third-party applications were installed during the making of this website.

## Usage

The planner is an hour-by-hour planner that works between the hours of 9a to 5p. The way this works is that the user enters a value into the text box, and then hits save. There are a few quick things about that:
    - If the event is in the present, then a message will pop up, saying that the task is already in progress. The user has to manually press "OK" to save the event. If the person cancels the event, then event is deleted, and not saved.
    - We don't even need to talk about what happens if the event is in the future.

## Credits

While I may have had some help from multiple sources (as listed below), I can assure you that the work provided is my own, original work.

1. I tried to retrieve the value of the Save button using jQuery to do localStorage. Stack Overflow helped me out with that (https://stackoverflow.com/questions/487056/retrieve-button-value-with-jquery). It is on display in the script.js file.

2. I have tried ENDLESSLY to store an array in localStorage. I had issues with doing this until I checked out this link (https://stackoverflow.com/questions/67312749/how-do-you-update-an-array-in-localstorage-without-overwriting-same-key-values). Now, it's in my Javascript project. Projects made simple. 

3. I tried getting the value of the text, and the jQuery API Documentation for parent() (.parent() | jQuery API Documentation) helped me out. It's in Javascript. The child is OK.

4. To ensure that I had the code to create the 'past, present, future' blocks, I decided to create <div> elements inside my Javascript file. I used two links to make that happen: (https://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery) and (https://stackoverflow.com/questions/10283414/jquery-add-div-with-class-definition). 

5. In order to satisfy the acceptance criteria, I have used the Day.js() documentation. It is on full display in my code. (https://day.js.org/).

## License

Please refer to the LICENSE in the repo.

## Deployment
Link to the deployed website: 
