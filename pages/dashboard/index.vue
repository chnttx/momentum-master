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
                <div id="quote" class="dashboard-box dashboard-right-box"></div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const layout = "board";
</script>

<style scoped lang="scss">
@use "~/assets/scss/dashboard.scss";
</style>
