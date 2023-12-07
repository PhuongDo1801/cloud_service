<template>
    <div class="container__left-sidebar">
        <div class="sidebar__header">
            <i class="multidot-icon"></i>
            <div class="sidebar__header-bran">
                <img src="" alt="Logo" />
            </div>
        </div>
        <div class="sidebar__main">
            <router-link to="/home" class="option">
                <div class="option__icon overview-icon"></div>
                <div class="option__content">Tổng quan</div>
            </router-link>
            <router-link to="/service" class="option">
                <div class="option__icon cash-icon"></div>
                <div class="option__content">Cash</div>
            </router-link>
            <router-link to="/history" class="option">
                <div class="option__icon deposits-icon"></div>
                <div class="option__content">Deposite</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheSidebar',
}
</script>

<style scoped>
@import url(../css/components/sidebar.css);
</style>