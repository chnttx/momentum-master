<template>
    <NuxtLayout :name="layout">
        <div>{{ session }}</div>
    </NuxtLayout>
</template>

<script setup lang="ts">
interface Chat {
    username: string;
    text: string;
    time: string;
}
const { getSession } = useAuth();

const layout = "board";
const message = ref("");
const chats = ref<Chat[]>([]);
const session = await getSession();

const sendMessage = async () => {
    /* To ChatGPT API */
};
</script>

<style scoped lang="scss"></style>
