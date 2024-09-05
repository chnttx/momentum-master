<!-- Dashboard layout -->
<template>

    <div class="dashboard-layout">
        
         <Header />
    
         <Sidebar />    
        
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'

export default {
    components: {
        Header,
        Sidebar
       
    }
}
</script>

<style scoped lang="scss">

@import "~/assets/scss/_colors.scss";
@import "~/assets/scss/_fonts.scss";
.dashboard-layout {
    background: linear-gradient(to bottom, white, #5085a5);

}
</style>
