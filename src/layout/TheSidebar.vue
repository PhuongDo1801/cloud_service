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
            <router-link to="/usermanage" class="option">
                <div class="option__icon overview-icon"></div>
                <div class="option__content">Quản lý người dùng</div>
            </router-link>
            <router-link to="/userservice" class="option">
                <div class="option__icon deposits-icon"></div>
                <div class="option__content">Dịch vụ người dùng</div>
            </router-link>
            <router-link to="/service" class="option">
                <div class="option__icon cash-icon"></div>
                <div class="option__content">Thông tin dịch vụ</div>
            </router-link>
            <router-link to="/history" class="option">
                <div class="option__icon deposits-icon"></div>
                <div class="option__content">Lịch sử sử dụng</div>
            </router-link>
            <router-link to="/pricing" class="option">
                <div class="option__icon deposits-icon"></div>
                <div class="option__content">Pricing</div>
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