<!-- src/components/Register.vue -->
<template>
  <div class="register-container">
    <div class="wrapper">
      <h1>Register</h1>
      <div class="register-form">
        <div class="input-box">
          <input type="text" placeholder="Username" v-model="user.UserName" required>
        </div>
        <div class="input-box">
          <input type="email" placeholder="Email" v-model="user.Email" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Password" v-model="user.Password" required>
        </div>
        <div class="input-box">
          <input type="text" placeholder="CCCD" v-model="user.IdentityNumber" required>
        </div>
        <div class="input-box">
          <input type="text" placeholder="PhoneNumber" v-model="user.PhoneNumber" required>
        </div>
        <button type="submit" class="btn" @click="register">Register</button>
        <div class="login-link">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
import userService from '@/services/userService';
export default {
  name: "RegisterPage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async register() {
      // Đoạn mã xử lý đăng ký ở đây
      try {
        const res = await userService.Register(this.user)
        console.log(res);
        this.$router.push('/login');
      }
      catch (error) {
        console.log(error);
      }
      // Trong ứng dụng thực tế, bạn có thể gửi yêu cầu đăng ký đến server,
      // xử lý xác minh và chuyển hướng sau khi đăng ký thành công.
    }
  }
}
</script>
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-image: url(../../assets/img/yn.jpg); */
  background-image: url(../../assets/img/DHBK.jpg);
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
}
.input-box input {
  width: 100%;
  height: 100%;
  background:  transparent;
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
.input-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
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
.wrapper .login-link {
  font-size: 14px;
  text-align: center;
  margin: 20px 0 15px;

}

.login-link p a {
  color: #FFF;
  text-decoration: none;
  font-weight: 500;
}

.login-link p a:hover {
  text-decoration: underline;
}

</style>