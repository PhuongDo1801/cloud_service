import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/view/Login";
import RegisterPage from "@/view/Register";
import DashboardPage from "@/view/Dashboard"
import HistoryPage from "@/view/History" 
import ServicePage from "@/view/Service"
import PricingPage from "@/view/Pricing"
// Định nghĩa các routers
const routers = [
    { path: '/', redirect: '/login' }, // Chuyển hướng từ trang gốc đến trang đăng nhập
  { path: '/login', component: LoginPage, name: "LoginRouter" },
  { path: '/register', component: RegisterPage, name: "RegisterRouter" },
  {path: '/home', component: DashboardPage, name: "DashboardRouter",
    children: [
      { path: '/home', component: PricingPage, },
      { path: '/history', component: HistoryPage, },
      { path: '/service', component: ServicePage, },
      { path: '/pricing', component: PricingPage, }
    ]
  }
]

// Khởi tạo các router
const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default vueRouter;