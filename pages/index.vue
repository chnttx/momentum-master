<!-- Dashboard layout -->
<template>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <div class="root-container">
        <div class="nav-container">
            <div class="logo">
                <img src="~/assets/images/mmlogo.svg" class="mmlogo" />
            </div>
            <nav class="navbar"></nav>
            <button>Get the App</button>
        </div>
        <hr />
        <div class="body">
            <div class="intro-wrapper">
                <div class="intro-container">
                    <h1 class="title">
                        Productivity and Personal Organization App
                    </h1>
                    <p class="intro">
                        Momentum Master turns your new<br />
                        tab into a motivational hub with<br />
                        daily quotes, a journal for your<br />
                        skills, and stunning backgrounds<br />
                        to enhance focus, productivity, and<br />
                        self development with an<br />
                        interactive AI.
                    </p>
                    <div class="auth">
                        <span>
                            <button class="login" v-on:click="handleLogin">
                                <span style="font-size: 28px">Login</span>
                                <img
                                    src="~/assets/images/login.svg"
                                    class="login-logo"
                                />
                            </button>
                        </span>
                    </div>
                </div>
                <div class="intro-container__right">
                    <img src="~/assets/images/appsample1.png" />
                </div>
            </div>

            <img src="~/assets/images/nomoss.svg" class="nomosslogo" />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
});
</script>

<style scoped lang="scss">
@use "~/assets/scss/home.scss";
</style>
