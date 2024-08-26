<!-- Home page -->
<template>
    <div class="nav-container">
        <div class="logo">
            <img src="~/assets/images/mmlogo.svg" class="mmlogo">
        </div>
        <a href="" class="features">Features</a>
        <a href="" class="platforms">Platforms</a>
        <a href="" class="guide">Guide</a>
        <a href="" class="download">Get the App</a>
    </div>
    <hr>
    <div class="body">
        <div class="intro-wrapper">
            <div class="intro-container">
                <h1 class="title">Productivity and Personal Organization App</h1>
                <p class="intro">Momentum Master turns your new<br> 
                    tab into a motivational hub with<br>
                    daily quotes, a journal for your<br>
                    skills, and stunning backgrounds<br>
                    to enhance focus, productivity, and<br>
                    self development with an<br>
                    interactive AI.
                </p>
            </div>
        </div>
        <img src="~/assets/images/nomoss.svg" class="nomosslogo">
    </div>
</template>

<style scoped lang="scss">
    .nav-container
    {
        display: flex;
        background-color: #C2D9EE;
    }

    .mmlogo
    {
        margin-left: 45%;
        width: 135%;
        height: 150px;
        
    }

    .download
    {
        margin-top: 65px;
        margin-left: auto;
        margin-right: 50px;
        font-family: "Montserrat";
        font-weight: bold;
        text-decoration: none;
        color: black;
    }

    .features, .platforms, .guide
    {
        margin-top: 65px;
        font-family: "Montserrat";
        font-weight: bold;
        text-decoration: none;
        color: black;
    }

    .features
    {
        margin-left: 900px;
    }

    .platforms
    {
        margin-left: 125px;
    }

    .guide
    {
        margin-left: 125px;
    }

    .intro-wrapper {
        display: flex;
        justify-content: flex-start; // Aligns the container to the left
        align-items: center;         // Vertically centers the content within the wrapper
    }

    .intro-container {
        margin-top: 100px;
        font-family: "Montserrat";
        margin-left: 85px;
        text-align: center;          // Center the text within the container
        max-width: 550px;            // Limit the width of the text block
        font-size: large;
    }

    .title
    {
        font-weight: bold;
    }

    .nomosslogo
    {
        position: fixed;    // Fixes the logo's position relative to the viewport
        bottom: 1px;       // Adjusts the distance from the bottom of the viewport
        left: 1px;         // Adjusts the distance from the left of the viewport
        width: 200px;
        height: 200px;
        margin-left: 50px;
    }

    .body
    {
        background-color: #CCE0EB;
        min-height: 85vh;
        display: flex;
        flex-direction: column;
    }
</style>
