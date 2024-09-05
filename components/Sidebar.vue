<!-- Sidebar -->
<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      
    <div class="container">
        <nav class="sidebar">
            <ul class="nav-list">
                <li><NuxtLink to="/Dashboard"><i class="fas fa-dashboard"></i> Dashboard</NuxtLink></li>
                <li><NuxtLink to="/Reflection"><i class="fas fa-eye"></i> Reflection</NuxtLink></li>
                <li><NuxtLink to="/Skills"><i class="fas fa-cogs"></i> Skills</NuxtLink></li>
                <li><NuxtLink to="/Journal"><i class="fas fa-book"></i> Journal</NuxtLink></li>
                <li><NuxtLink to="/Security"><i class="fas fa-lock"></i> Security</NuxtLink></li>
                <li><NuxtLink to="/Settings"><i class="fas fa-cog"></i> Settings</NuxtLink></li>
                <button class = 'logout-button'><i class="fas fa-sign-out-alt"></i> Log Out</button>
            </ul>
        </nav>
        
    </div>


</template>

<style scoped lang="scss">
    @use "~/assets/scss/sidebar.scss";
</style>
