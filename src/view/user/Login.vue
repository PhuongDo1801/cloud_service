<!-- src/components/Login.vue -->
<template>
  <div class="login-container">
    <div class="wrapper">
      <h1>Login</h1>
      <div class="login-form">
        <div class="input-box">
          <input type="text" :class="{
            invalid:
              isError
          }"
           @input="resetError" 
          placeholder="Email" v-model="user.Email" required>
          <span v-if="isError">Email hoặc mật khẩu không chính xác</span>
        </div>
        <div class="input-box">
          <input type="password" :class="{
            invalid:
              isError
          }" 
           @input="resetError" placeholder="Password" v-model="user.Password" required>
        </div>
        <div class="remember-forgot">
          <label><input type="checkbox"> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" class="btn" @click="login">Login</button>
        <div class="register-link">
          <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import userService from '@/services/userService';
export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
      isError: false,
    };
  },
  methods: {
    async login() {
      try {
        const res = await userService.Login(this.user);
        console.log(res)
        if (res.status == 200) {
          // Gọi API GetInfoUser để lấy thông tin người dùng
          const userInfoResponse = await userService.GetInfoUser();

          // Lưu vai trò vào localStorage
          localStorage.setItem('email', userInfoResponse.data.Email);
          localStorage.setItem('role', userInfoResponse.data.Role);
          localStorage.setItem('username', userInfoResponse.data.UserName);
          // Chuyển hướng dựa trên vai trò
          this.redirectBasedOnRole();
        }
      }
      catch (error) {
        this.isError = true;
      }
    },
    resetError() {
      this.isError = false;
    },
    redirectBasedOnRole() {
      // Lấy vai trò từ localStorage
      const role = localStorage.getItem('role');
      console.log(role);
      // Chuyển hướng dựa trên vai trò
      if (role === 'admin') {
        this.$router.push('/usermanage');
      } else {
        this.$router.push('/home');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-image: url(../../assets/img/yn.jpg); */
  background-image: url(../../assets/img/bgc_cloud.jpg);
  background-size: cover;
  background-position: center;
}

.wrapper {
  width: 420px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  color: #FFF;
  border-radius: 10px;
  padding: 30px 40px;
}

.wrapper h1 {
  font-size: 36px;
  text-align: center;
}

.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 40px;
  border: 2px solid rgba(255, 255, 255, .2);
  font-size: 16px;
  color: #FFF;
  padding: 20px 45px 20px 20px;
}

.input-box ::placeholder {
  color: #FFF;
}

/* .input-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
} */
.input-box span {
  margin-top: 12px;
  color: red;
  font-size: 14px;
}

.wrapper .remember-forgot {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: -15px 0 15px;
}

.remember-forgot label input {
  accent-color: #fff;
  margin-right: 3px;
}

.remember-forgot a {
  color: #fff;
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
}

.wrapper .btn {
  width: 100%;
  height: 32px;
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  color: #333;
  font-weight: 500;
}

.wrapper .register-link {
  font-size: 14px;
  text-align: center;
  margin: 20px 0 15px;

}

.register-link p a {
  color: #FFF;
  text-decoration: none;
  font-weight: 500;
}

.register-link p a:hover {
  text-decoration: underline;
}

.invalid {
  border: 1px solid red !important;
}
</style>
  