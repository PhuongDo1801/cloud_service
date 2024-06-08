import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/view/user/Login";
import RegisterPage from "@/view/user/Register";
import DashboardPage from "@/view/Dashboard"
import HistoryPage from "@/view/component/History" 
import EC2ServicePage from "@/view/component/services/EC2Service.vue"
import BudgetPage from "@/view/component/budgets/BudgetPage"
import AWSService from "@/view/component/services/AWSService"
import UserManagement from "@/view/admin/UserManagement"
import ServiceManagement from "@/view/admin/ServiceManagement"
import HomePage from "@/view/component/Home"
import UserProfile from "@/view/user/UserProfile"
import RDSServicePage from "@/view/component/services/RDSService"
// import LambdaServicePage from "@/view/component/service/LambdaService"
import LambdaServicePage from "@/view/component/services/LambdaService"
// Định nghĩa các routers
const routers = [
    { path: '/', redirect: '/login' }, // Chuyển hướng từ trang gốc đến trang đăng nhập
  { path: '/login', component: LoginPage, name: "LoginRouter" },
  { path: '/register', component: RegisterPage, name: "RegisterRouter" },
  {path: '/dashboard', component: DashboardPage, name: "DashboardRouter",
    children: [
      { path: '/home', component: HomePage, },
      { path: '/service/ec2', component: EC2ServicePage, },
      { path: '/service/rds', component: RDSServicePage, },
      { path: '/service/lambda', component: LambdaServicePage, },
      { path: '/budgets', component: BudgetPage, },
      { path: '/history', component: HistoryPage, },
      { path: '/awsservice', component: AWSService, },
      { path: '/usermanage', component: UserManagement,},
      { path: '/servicemanage', component: ServiceManagement,},
      { path: '/profile', component: UserProfile,}
    ]
  }
]

// Khởi tạo các router
const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default vueRouter;