<template>
    <div class="container__left-sidebar">
        <div class="sidebar__header">
            <!-- <i class="multidot-icon"></i> -->
            <div class="sidebar__header-bran">
                <img src="../assets/img/hust-Lg.png" alt="Logo" />  
            </div>
            <h2>CloudHUST</h2>
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
                <div class="option__content">Tra cứu chi phí</div>
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