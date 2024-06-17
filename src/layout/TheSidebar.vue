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
            <router-link to="/history" class="option" v-if="isUser">
                <div class="option__icon history-icon"></div>
                <div class="option__content">Lịch sử sử dụng</div>
            </router-link>
            <!-- <router-link to="/awsservice" class="option" v-if="isUser">
                <div class="option__icon deposits-icon"></div>
                <div class="option__content">Dịch vụ AWS</div>
            </router-link> -->
            <!-- <router-link to="/service" class="option" v-if="isUser">
                <div class="option__icon cash-icon"></div>
                <div class="option__content">Quản lý dịch vụ</div>
            </router-link> -->
            <div class="dropdown" v-if="isUser">
                <div class="option">
                    <div class="option__icon cash-icon"></div>
                    <div class="option__content">Quản lý dịch vụ</div>
                    <div class="dropdown-white-icon" @click="toggleDropdown"></div>
                </div>
                <div class="dropdown-menu" v-if="isDropdownOpen">
                    <!-- <router-link to="/service/ec2" class="dropdown-item option">EC2</router-link>
                    <router-link to="/service/rds" class="dropdown-item option">RDS</router-link>
                    <router-link to="/service/lambda" class="dropdown-item option">Lambda</router-link> -->
                    <router-link v-for="service in activeServices" :key="service.Id"
                        :to="`/service/${service.ServiceName.toLowerCase()}`" class="dropdown-item option">
                        {{ service.ServiceName }}
                    </router-link>
                    <router-link to="/service/activitylog" class="dropdown-item option">Lịch sử thao tác</router-link>
                </div>
            </div>
            <router-link to="/budgets" class="option" v-if="isUser">
                <div class="option__icon budget-icon"></div>
                <div class="option__content">Quản lý ngân sách</div>
            </router-link>
            <router-link to="/profile" class="option" v-if="isUser">
                <div class="option__icon userprofile-icon"></div>
                <div class="option__content">Thông tin cá nhân</div>
            </router-link>
            <router-link to="/login" class="option" @click="logout">
                <div class="option__icon logout-icon"></div>
                <div class="option__content">Logout</div>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import ServiceManager from "@/services/ServiceManagerService";
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
        activeServices() {
            return this.services.filter(service => service.Status === 1);
        },
        // Các computed properties khác nếu cần
    },
    data() {
        return {
            isDropdownOpen: false,
            services: [],
        };
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        async fetchServices() {
            try {
                const response = await ServiceManager.getList();
                this.services = response.data;
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        logout() {
        // Xoá dữ liệu trong localStorage
        localStorage.clear();
        // Chuyển hướng đến trang login
        this.$router.push('/login');
        },
    },
    created() {
        this.fetchServices();
    },
}
</script>

<style scoped>
@import url(../css/components/sidebar.css);
</style>