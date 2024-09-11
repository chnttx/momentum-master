<!-- Header  -->
<template>
    <div class="header">
        <!-- Content of the header can go here -->

        <div class="profile">
            <img
                :src="userImage"
                alt="Profile Picture"
                class="profile-picture"
            />
            <span class="profile-name">{{ username }}</span>
        </div>
        <img src="@/assets/images/mmlogo.svg" alt="Logo" class="logo" />
    </div>
</template>

<script setup lang="ts">
import dummyAvatar from "~/assets/images/dummy-avatar.jpg";
const { getSession } = useAuth();
const session = await getSession();
const username = session.user.name ? session.user.name : "username";
const userImage = session?.user?.image ? session.user.image : dummyAvatar;
</script>

<style scoped lang="scss">
@use "~/assets/scss/header.scss";
</style>
