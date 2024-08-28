<!-- Home page -->
<template>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <div class="root-container">
        <div class="nav-container">
            <div class="logo">
                <img src="~/assets/images/mmlogo.svg" class="mmlogo">
            </div>
            <nav class="navbar">
                <ul class="nav-list">
                    <li> <a href="">Features</a> </li>
                    <li> <a href="">Platforms</a> </li>
                    <li> <a href="">Guide</a> </li>
                    <li id="getApp"> <a style="color:#fff;padding-top: 10px;padding-bottom: 10px;padding-right: 10px;padding-left: 10px;" href="" data-v-02281a80="">Get The App</a> </li>
                </ul>
            </nav>
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
                    <div class="auth">
                        <span style="float: left;">
                            <a href="" class="login">
                                <span style="font-size: 28px;">Login</span>
                                <img src="~/assets/images/login.svg" class="loginlogo">
                            </a>
                        </span>
                        <span style="float: right;">
                            <a href="" class="signup">
                                <span style="font-size: 28px;">Sign Up</span>
                                <img src="~/assets/images/Component 2.svg" class="loginlogo">
                            </a>
                        </span>
                    </div>
                </div>
                <div class="intro-container-right">
                    <img  height="120%" width="90%" src="~/assets/images/mask.png">
                </div>
            </div>
            <p style="float: left;">
                <img src="~/assets/images/nomoss.svg" class="nomosslogo">
            </p>            
        </div>
    </div>
</template>

<style scoped lang="scss">

    .root-container{
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .navbar{
        float: right;
        overflow: hidden;
        font-family: "Montserrat";
    }

    .nav-list{
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        padding-left: 35em;
        justify-content: space-between;
    }

    .nav-list li
    {
        flex: 1;
        margin: 0 60px;;
    }

    .nav-list li:last-child
    {
        margin: 0;
        margin-left: 20em;
    }

    .nav-list a
    {
        display: block;
        color: black;
        text-align: center;
        font-size: 23px;
        font-weight: bold;
        text-decoration: none;
        padding-top: 8px;
        white-space: nowrap;
    }

    #getApp{
        background-color: #1C64B6;
        color: #fff;
        border-radius: 2rem;
        margin-bottom: 4px;
    }

    .nav-container
    {
        display: flex;
        background-color: #C2D9EE;
        padding-right: 5rem;
        align-items: center;
    }

    .mmlogo
    {
        padding-left: 4rem;
        height: 7rem;
    }

    .intro-wrapper {
        display: flex;
        justify-content: flex-start; 
        padding-left: 200px
    }

    .intro-container {
        padding-top: 5rem;
        font-family: "Montserrat";
        margin-left: 85px;
        text-align: center;          
        max-width: 550px;            
        font-size: 30px;
        width: 50%;
        
    }

    .intro-container-right {
        padding-top: 5rem;         
        max-width: 550px;           
        width: 50%;
        padding-left: 400px;
    }

    .title
    {
        font-weight: bold;
        font-size: 44px;
        padding-top: 50px;
    }

    .nomosslogo
    {
        width: 15rem;
        height: 15rem;
        padding-left: 35px;
        padding-top: 16em;
    }

    .body
    {
        background-color: #CCE0EB;
        height: 91%;
        display: flex;
        flex-direction: column;
    }

    hr
    {
        margin: 0;
    }

    .login
    {
        margin-top: 0.5rem;
        margin-left: 1rem;
        padding: 0.5rem 1rem;
        background-color: #1C64B6;
        border-radius: 2rem;
        color: white;
        text-decoration: none;
        font-size: large;
        display: flex;
    }

    .signup
    {
        margin-left: 5rem;
        padding: 1rem 3rem;
        background-color: whitw;
        border-radius: 2rem;
        color: black;
        text-decoration: none;
        font-size: 30px;
        display: flex;
    }

    .auth
    {
        font-family: "Montserrat";
        display: flex;
        padding-top: 10px;
    }

    .loginlogo
    {
        display: flex;
        margin-left: 0.5rem;
    }

    .signuplogo
    {
        padding-left: 1rem;
    }


    @media screen and (max-width: 1682px)
    {
        .nav-list
        {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            padding-left: 10em;
            justify-content: space-between;
        }

        .nav-list a 
        {
            padding: 10px
        }

        .nav-list li
        {
            flex: 1;
            margin: 0 60px;;
        }

        .nav-list li:last-child
        {
            margin: 0;
            margin-left: 2em;
        }

        .navbar
        {
            overflow: hidden;
        }
    }
</style>