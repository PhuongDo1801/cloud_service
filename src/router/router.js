import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/view/LoginPage";
import RegisterPage from "@/view/RegisterPage";
// Định nghĩa các routers
const routers = [
    { path: '/', redirect: '/login' }, // Chuyển hướng từ trang gốc đến trang đăng nhập
  { path: '/login', component: LoginPage, name: "LoginRouter" },
  { path: '/register', component: RegisterPage, name: "RegisterRouter" },
  {path: '/home'}
]

// Khởi tạo các router
const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default vueRouter;