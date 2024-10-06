<!-- Landing page -->
<template>
    <NuxtLayout :name="layout">
        <div id="dashboard-container">
            <div id="dashboard-left" class="dashboard-content">
                <div
                    id="skill-focused"
                    class="dashboard-box dashboard-left-box"
                >
                    <div id="focus-text" v-if="skills_used.length > 0">
                        Focus
                    </div>
                    <div id="focus-description" v-if="skills_used.length > 0">
                        You have been focusing on
                        <b>{{ skills_used[0].name }}</b>
                    </div>
                    <div v-else>
                        No focus yet, let's start with a reflection
                    </div>
                </div>
                <div
                    id="skill-bar-chart"
                    class="dashboard-box dashboard-left-box"
                ></div>
                <div id="goals" class="dashboard-box dashboard-left-box"></div>
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
const { data: skills_used } = await useFetch("/api/skills_used/user");
console.log(skills_used);
</script>

<style scoped lang="scss">
@use "~/assets/scss/dashboard.scss";
</style>
