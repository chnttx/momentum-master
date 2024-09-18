<!-- Sidebar -->
<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />

    <nav class="sidebar">
        <ul class="nav-list">
            <li>
                <NuxtLink to="/dashboard">
                    <i class="fas fa-dashboard"></i> <span>Dashboard</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/reflection">
                    <i class="fas fa-eye"></i> <span>Reflection</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/skills">
                    <i class="fas fa-cogs"></i> <span>Skills</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/journal">
                    <i class="fas fa-book"></i> <span>Journal</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/security">
                    <i class="fas fa-lock"></i> <span>Security</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/settings">
                    <i class="fas fa-cog"></i> <span>Settings</span>
                </NuxtLink>
            </li>
        </ul>
        <button class="logout-button" @click="handleAuth0Logout">
            <i class="fas fa-sign-out-alt"></i> <span>Logout</span>
        </button>
    </nav>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
@use "~/assets/scss/sidebar.scss";
</style>
