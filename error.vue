<template>
    <div class="container">
        <div class="error-card">
            <p id="status-code">{{ error.statusCode }}</p>
            <p id="message">{{ error.message }}</p>
            <button class="btn" @click="handleError">Return to Home</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<style lang="scss">
@use "~/assets/scss/error.scss";
</style>
