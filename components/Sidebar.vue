<!-- Sidebar -->
<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />

    <nav class="sidebar">
        <ul class="nav-list">
            <li>
                <NuxtLink to="/Dashboard">
                    <i class="fas fa-dashboard"></i> <span>Dashboard</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/Reflection">
                    <i class="fas fa-eye"></i> <span>Reflection</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/Skills">
                    <i class="fas fa-cogs"></i> <span>Skills</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/Journal">
                    <i class="fas fa-book"></i> <span>Journal</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/Security">
                    <i class="fas fa-lock"></i> <span>Security</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/Settings">
                    <i class="fas fa-cog"></i> <span>Settings</span>
                </NuxtLink>
            </li>
        </ul>
        <NuxtLink class="logout-button" to="/logout">
            <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
        </NuxtLink>
    </nav>
</template>

<script lang="ts">
const logout = () => {
    navigateTo("logout");
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/sidebar.scss";
</style>
