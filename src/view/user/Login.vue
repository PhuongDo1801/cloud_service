<!-- src/components/Login.vue -->
<template>
  <div class="login-container">
    <div class="wrapper">
      <h1>Login</h1>
      <div class="login-form">
        <div class="input-box">
          <input type="text" placeholder="Email" v-model="user.Email" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Password" v-model="user.Password" required>
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
    };
  },
  methods: {
    async login() {
      try {
        const res = await userService.Login(this.user);
        console.log(res)
        // if(res.data == true) this.$router.push('/home') 
        if (res.status == 200) this.$router.push('/home');
        // console.log(res);
      }
      catch (error) {
        console.log(error);
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


</style>
  