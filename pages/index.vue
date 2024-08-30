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
                    <li> <NuxtLink>Features</NuxtLink> </li>
                    <li> <NuxtLink>Platforms</NuxtLink> </li>
                    <li> <NuxtLink>Guide</NuxtLink> </li>
                </ul>
            </nav>
            <button>Get the App</button>
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
                        <span>
                            <a href="" class="login">
                                <span style="font-size: 28px;">Login</span>
                                <img src="~/assets/images/login.svg" class="login-logo">
                            </a>
                        </span>
                        <span>
                            <a href="" class="signup">
                                <span style="font-size: 28px;">Sign Up</span>
                                <img src="~/assets/images/Component 2.svg" class="login-logo">
                            </a>
                        </span>
                    </div>
                </div>
                <div class="intro-container__right">
                    <img src="~/assets/images/mask.png">
                </div>
            </div>

            <img src="~/assets/images/nomoss.svg" class="nomosslogo">

        </div>
    </div>
</template>

<style scoped lang="scss">
    $button-color: #1C64B6;

    .body--override {
        margin: 0;
        padding: 0;
    }


    .nav-container {
        display: flex;
        background-color: #C2D9EE;
        justify-content: space-around;
        align-items: center;
        min-height: 7rem;
        padding-top: 1rem;
        padding-bottom: 1rem;

        .nav-list {
            list-style: none;
            display: flex;
            gap: 6rem;
            a {

              color: black;
              font-size: 32px;
              font-weight: bold;
              text-decoration: none;

            }
        }

        .navbar {

            font-family: "Montserrat";
        }

        > button {
            border-radius: 4rem;
            padding: 15px 20px;
            border: none;
            color: white;
            background-color: $button-color;
            box-sizing: border-box;
            font-size: 24px;
            font-weight: bold;
        }

        .mmlogo {
            height: 7rem;
        }

    }

    .intro-wrapper {
        display: flex;
        justify-content: center;
        gap: 10rem;


        .intro-container {
            font-family: "Montserrat";
            text-align: center;
            font-size: 30px;
            max-width: 40rem;

            &__right {
                width: 40rem;
                padding-right: 3rem;

                > img {
                    padding-top: 10rem;
                    width: 100%;
                }

            }

            @media screen and (max-width: 768px) {
                &__right {
                    display: none;
                }
                .title {
                    font-size: 16px;
                }
            }

            .title {
                font-weight: bold;
                font-size: 44px;
                margin: 0;
                padding-top: 10rem;
            }

        }
    }

    .root-container {

        .body {
            background-color: #CCE0EB;
            display: flex;
            flex-direction: column;

            > .nomosslogo {
              width: 15rem;
              height: 15rem;
              padding-left: 35px;
              padding-top: 16em;
            }
            .auth {
                font-family: "Montserrat";
                display: flex;
                justify-content: center;
                padding-top: 10px;
                gap: 3rem;
                .login {
                    padding: 0.5rem 1rem;
                    background-color: #1C64B6;
                    border-radius: 2rem;
                    color: white;
                    text-decoration: none;
                    font-size: 32px;
                    display: flex;

                    .login-logo {
                      display: flex;
                    }
                }

                .signup {
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    color: black;
                    text-decoration: none;
                    font-size: 30px;
                    display: flex;
                    gap: 5px;
                    box-sizing: border-box;
                }
            }
        }

        hr {
            margin: 0;
        }
    }


</style>