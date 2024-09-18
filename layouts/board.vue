<!-- Dashboard layout -->
<template>
    <div class="dashboard-layout">
        <div class="dashboard">
            <Header />
            <div class="window">
                <Sidebar />
                <div class="content"><slot> </slot></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "~/assets/scss/board.scss";
</style>
