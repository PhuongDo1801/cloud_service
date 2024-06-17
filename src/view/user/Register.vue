<!-- src/components/Register.vue -->
<template>
  <div class="register-container">
    <div class="wrapper">
      <h1>Register</h1>
      <form class="register-form" @submit.prevent="register">
        <div class="user-box">
            <div class="infor-box">
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
              <div class="input-box">
                <input type="date" placeholder="DateOfBirth" v-model="user.DateOfBirth" required>
              </div>     
            </div>
            <div class="key-box">
                <div class="input-box">
                  <input type="text" placeholder="AwsId" v-model="user.AwsId" required>
                </div>
                <div class="input-box">
                  <input type="text" placeholder="SecretKey" v-model="user.SecretKey" required>
                </div>
                <div class="input-box">
                  <input type="text" placeholder="AccessKey" v-model="user.AccessKey" required>
                </div>
                <div class="input-box">
                  <a href="https://viblo.asia/p/aws-iam-identity-and-access-management-la-gi-1Je5EXz4lnL" target="_blank" style="color: #fff">Get keys guide</a>
                </div>
            </div>
        </div>
        <button type="submit" class="btn">Register</button>
        
      </form>
      <div class="login-link">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
    </div>

  </div>
</template>
  
<script>
import AuthService from '@/services/AuthService';
export default {
  name: "RegisterPage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async register() {
      try {
        this.user.Role = "user"
        const res = await AuthService.Register(this.user)
        console.log(res);
        if(res.status == 200) alert("Đăng ký thành công")
        this.$router.push('/login');
      }
      catch (error) {
        console.log(error);
        if(error.response.data.ErrorMsgs.Email) alert(error.response.data.ErrorMsgs.Email)
        if(error.response.data.ErrorMsgs.DateOfBirth) alert(error.response.data.ErrorMsgs.DateOfBirth)
      }
    }
  }
}
</script>
<style scoped>
/* .register-form {
  display: flex;
  flex-direction: column;
  justify-content: center
} */
.register-container {
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
  width: 50%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  color: #FFF;
  border-radius: 10px;
  padding: 30px 40px;

}
.user-box {
  width: 100%;
}
.infor-box {
  width: 45%;
}
.key-box {
  width: 45%;
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
  padding: 20px 20px 20px 20px;
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
.input-box input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.wrapper .btn {
  width: 100%;
  height: 32px;
  /* margin: auto; */
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
.user-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>