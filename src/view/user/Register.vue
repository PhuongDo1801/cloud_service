<!-- src/components/Register.vue -->
<template>
    <div class="auth-container">
    <h2>Register</h2>
    <div class="auth-form">
      <label for="username">Username:</label>
      <input type="text" v-model="user.UserName" required>

      <label for="email">Email:</label>
      <input type="email" v-model="user.Email" required>

      <label for="password">Password:</label>
      <input type="password" v-model="user.Password" required>

      <label for="identityNumber">IdentityNumber:</label>
      <input type="text" v-model="user.IdentityNumber" required>

      <label for="phoneNumber">PhoneNumber:</label>
      <input type="text" v-model="user.PhoneNumber" required>

      <button type="submit" @click="register">Register</button>
    </div>

    <div class="auth-options">
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
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
        catch(error){
          console.log(error);
        }
        // Trong ứng dụng thực tế, bạn có thể gửi yêu cầu đăng ký đến server,
        // xử lý xác minh và chuyển hướng sau khi đăng ký thành công.
      }
    }
  }
  </script>
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .auth-form {
    margin-bottom: 20px;
  }
  
  .auth-form label {
    display: block;
    margin-bottom: 8px;
  }
  
  .auth-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
  }
  
  .auth-form button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .auth-options {
    text-align: center;
    margin-top: 10px; /* Khoảng cách giữa form và các options */
  }
  
  .auth-options router-link {
    margin-right: 10px;
    color: #3498db; /* Màu sắc cho các liên kết options */
    text-decoration: underline; /* Gạch chân cho các liên kết options */
    cursor: pointer;
  }
  </style>