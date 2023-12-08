<!-- src/components/Login.vue -->
<template>
  <div class="login-container">
    <h2>Login</h2>
    <div class="login-form">
      <label for="email">Email:</label>
      <input type="text" v-model="user.email" required id="email">

      <label for="password">Password:</label>
      <input type="password" v-model="user.password" required id="password">  

      <button @click="login">Login</button>
    </div>

    <div class="login-options">
      <p>Don't have account? <router-link to="/register">Register</router-link></p>
      <!-- <router-link to="/forgot-password">Forgot Password?</router-link> -->
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
        if(res.status == 200) this.$router.push('/home');
        // console.log(res);
      }
      catch(error){
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  margin-bottom: 20px;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
}

.login-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
}

.login-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-options {
  text-align: center;
}

.login-options router-link {
  margin-right: 10px;
}
</style>
  