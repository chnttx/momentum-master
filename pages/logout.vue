<script setup lang="ts">
    import {handleApplicationLogout} from "~/composables/auth";
    (async function (){

        await handleApplicationLogout()
    })()

</script>

<template>

</template>

<style scoped lang="scss">

</style>