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
import { ref, onMounted } from "vue";
import dummyAvatar from "~/assets/images/dummy-avatar.jpg";
const username = ref("username");
const userImage = ref(dummyAvatar);

const { getSession } = useAuth();

onMounted(async () => {
    const session = await getSession();
    username.value = session?.user?.name ?? "username";
    userImage.value = session?.user?.image ?? dummyAvatar;
});
</script>

<style scoped lang="scss">
@use "~/assets/scss/header.scss";
</style>
