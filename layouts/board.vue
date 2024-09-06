<!-- Dashboard layout -->
<template>
    <div class="dashboard-layout">
        <div class="dashboard">
            <Header />
            <div class="window">
                <Sidebar />
                <div class="content"><slot> </slot></div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
    components: {
        Header,
        Sidebar,
    },
};
</script>

<style scoped lang="scss">
@use "~/assets/scss/board.scss";
</style>
