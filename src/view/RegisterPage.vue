<!-- src/components/Register.vue -->
<template>
    <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="register" class="auth-form">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required>

      <label for="email">Email:</label>
      <input type="email" v-model="email" required>

      <label for="password">Password:</label>
      <input type="password" v-model="password" required>

      <button type="submit">Register</button>
    </form>

    <div class="auth-options">
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: "RegisterPage",
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        // Đoạn mã xử lý đăng ký ở đây
        console.log('Registering with:', this.username, this.email, this.password);
        
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