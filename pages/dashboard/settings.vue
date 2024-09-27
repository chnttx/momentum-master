<template>
    <NuxtLayout :name="layout">
        <div class="user-settings">
            <ul v-for="setting in settings">
                <li>{{ setting.description }}</li>
            </ul>
        </div>  
    </NuxtLayout>
</template>


<script setup lang="ts">
const layout="board"
const settings = [
    {
        description: "Enable email notifications",
    },
    {
        description: "Enable dark mode"
    }
]
// const 
</script>