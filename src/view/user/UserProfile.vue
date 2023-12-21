<template>
    <div class="user-proflie-title">
        <span>Thông tin người dùng</span>
        <button class="btn btn-change-pw">Đổi mật khẩu</button>
    </div>
    <div class="user-profile-page">
        <div class="user-info">
            <label for="">Tên người dùng:</label>
            <input type="text" placeholder="Username" v-model="user.UserName" required>
        </div>
        <div class="user-info">
            <label for="">Email:</label>
            <input type="email" placeholder="Email" v-model="user.Email" required>
        </div>
        <div class="user-info">
            <label for="">CCCD:</label>
            <input type="text" placeholder="CCCD" v-model="user.IdentityNumber" required>
        </div>
        <div class="user-info">
            <label for="">Số điện thoại:</label>
            <input type="text" placeholder="PhoneNumber" v-model="user.PhoneNumber" required>
        </div>
        <div class="user-info">
            <label for="">Ngày sinh:</label>
            <input type="date" placeholder="PhoneNumber" v-model="user.DateOfBirth" required>
        </div>
        <button type="submit" class="btn" @click="updateUser">Update</button>
    </div>
</template>

<script>
import { format } from 'date-fns';
import userService from '@/services/userService';
export default {
    name: "UserProfile",
    data() {
        return {
            user: {},
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            try {
                const email = localStorage.getItem('email');
                const res = await userService.getUserByEmail(email);
                // console.log(res);
                const user = res.data;

                // Định dạng ngày sinh trước khi gán vào thuộc tính user
                user.DateOfBirth = format(new Date(user.DateOfBirth), 'yyyy-MM-dd');

                this.user = user;
            }
            catch (error) {
                console.log(error);
            }
        },
        async updateUser() {
            try {
                const res = await userService.update(this.user.UserId, this.user)
                console.log(res);
            }
            catch(error){
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.user-proflie-title {
    width: 100%;
    height: 68px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.user-proflie-title span {
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
}
.user-profile-page {
    margin: auto;
    width: 70%;
    height: auto;
    background-color: #fff;
    padding: 24px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.user-profile-page .user-info {
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}
.user-info label {
    width: 20%;
    font-weight: 700;
}
.user-info input {
    width: 80%;
    height: 32px;
    /* border: none; */
    outline: none;
    border-radius: 4px;
    border: 2px solid rgba(66, 62, 62, 0.2);
    padding-left: 12px;
}
.user-profile-page .btn {
    height: 28px;
    width: 80px;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
    border: none;
    background-color: #50B83C;
    /* float: right; */
    margin-top: 12px;
    align-self: flex-end;
}

.user-profile-page .btn:hover {
    background-color: #4acf2f;
}

.user-profile-page .btn:focus {
    background-color: #067933;
}
.btn-change-pw {
    height: 32px;
    min-width: 80px;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
    border: none;
    background-color: #50B83C;
    padding: 0 12px;
    /* float: right; */
    /* margin-top: 12px; */
}
</style>