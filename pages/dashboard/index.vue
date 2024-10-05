<!-- Landing page -->
<template>
    <NuxtLayout :name="layout">
        <div id="dashboard-container">
            <div id="dashboard-left" class="dashboard-content">
                <div class="dashboard-box dashboard-left-box"></div>
                <div class="dashboard-box dashboard-left-box"></div>
                <div class="dashboard-box dashboard-left-box"></div>
            </div>
            <div id="dashboard-right" class="dashboard-content">
                <div
                    id="calendar"
                    class="dashboard-box dashboard-right-box"
                ></div>
                <div id="quote" class="dashboard-box dashboard-right-box">
                    <div>"{{ quote[0].q }}"</div>
                    <div id="breakline"></div>
                    <div>{{ quote[0].a }}</div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const layout = "board";
const { data: quote } = await useFetch("https://zenquotes.io/api/random");
console.log(quote.value[0]);
</script>

<style scoped lang="scss">
@use "~/assets/scss/dashboard.scss";
</style>
