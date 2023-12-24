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
            <router-link to="/usermanage" class="option" v-if="isAdmin">
                <div class="option__icon usermanege-icon"></div>
                <div class="option__content">Quản lý người dùng</div>
            </router-link>
            <router-link to="/servicemanage" class="option" v-if="isAdmin">
                <div class="option__icon overview-icon"></div>
                <div class="option__content">Quản lý dịch vụ</div>
            </router-link>
            <router-link to="/home" class="option" v-if="isUser">
                <div class="option__icon overview-icon"></div>
                <div class="option__content">Tổng quan</div>
            </router-link>
            <router-link to="/awsservice" class="option" v-if="isUser">
                <div class="option__icon deposits-icon"></div>
                <div class="option__content">Dịch vụ người dùng</div>
            </router-link>
            <router-link to="/service" class="option" v-if="isUser">
                <div class="option__icon cash-icon"></div>
                <div class="option__content">EC2</div>
            </router-link>
            <router-link to="/history" class="option" v-if="isUser">
                <div class="option__icon history-icon"></div>
                <div class="option__content">Lịch sử sử dụng</div>
            </router-link>
            <!-- <router-link to="/pricing" class="option" v-if="isUser">
                <div class="option__icon search-service-icon"></div>
                <div class="option__content">Tra cứu chi phí</div>
            </router-link> -->
            <router-link to="/profile" class="option" v-if="isUser">
                <div class="option__icon userprofile-icon"></div>
                <div class="option__content">Thông tin cá nhân</div>
            </router-link>
            <router-link to="/login" class="option">
                <div class="option__icon logout-icon"></div>
                <div class="option__content">Logout</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheSidebar',
    computed: {
    isAdmin() {
      // Lấy vai trò từ localStorage hoặc nơi khác
      const role = localStorage.getItem('role');
      // Kiểm tra xem có phải là vai trò admin không
      return role === 'admin';
    },
    isUser() {
      // Lấy vai trò từ localStorage hoặc nơi khác
      const role = localStorage.getItem('role');
      // Kiểm tra xem có phải là vai trò user không
      return role === 'user';
    },
    // Các computed properties khác nếu cần
  },
}
</script>

<style scoped>
@import url(../css/components/sidebar.css);
</style>