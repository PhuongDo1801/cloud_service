<template>

    <div class="container__right-popup">
        <div v-if="isDialogOverlayShow" class="dialog-overlay"></div>
        <div class="container__right-icon-wraper">
            <div class="info-icon" title="Thông tin"></div>
            <div class="close-icon" id="close-icon-add-user" @click="closeUserDetailByIcon" title="Đóng">
            </div>
        </div>
        <div class="container__right-popup-top">
            <span v-if="!isEditUser">Thêm mới người dùng</span>
            <span v-if="isEditUser">Thông tin người dùng</span>
            <div>
                <input title="Admin" type="checkbox" v-model="user.role" />
                <label for="">
                    Admin
                </label>
            </div>
        </div>
        <div class="container__right-popup-body">
            <div class="container__right-popup-body-top">
                <div class="input-box">
                    <label for="">
                        Tên người dùng
                    </label>
                    <input title="Tên người dùng" type="text" v-model="user.UserName" :class="{
                        invalid:
                            userErrors.UserName
                    }" @input="() => handleChangeInput('UserName')" ref="UserName" />
                </div>
                <div class="input-box">
                    <label for="">
                        Email
                    </label>
                    <input title="Email" type="text" v-model="user.Email" :class="{
                        invalid:
                            userErrors.Email
                    }" @input="() => handleChangeInput('Email')" ref="Email" />
                </div>
                <div class="input-box">
                    <label for="">
                        Số điện thoại
                    </label>
                    <input title="Số điện thoại" type="text" v-model="user.PhoneNumber" :class="{
                        invalid:
                            userErrors.PhoneNumber
                    }" @input="() => handleChangeInput('PhoneNumber')" ref="PhoneNumber" />
                </div>
                <div class="input-box">
                    <label for="">
                        CCCD
                    </label>
                    <input title="CCCD" type="text" v-model="user.IdentityNumber" :class="{
                        invalid:
                            userErrors.PhoneNumber
                    }" @input="() => handleChangeInput('IdentityNumber')" ref="IdentityNumber" />
                </div>
                <div class="input-box">
                    <label for="">Ngày sinh</label>
                    <input :title="userErrors.DateOfBirth ?
                        'Ngày sinh không hợp lệ' : 'Ngày sinh'" type="date"
                        :value="formattedDate(user.DateOfBirth)" @input="updateDate($event, 'DateOfBirth')" :class="{
                            invalid: userErrors &&
                                userErrors.DateOfBirth
                        }" ref="DateOfBirth" />
                </div>
            </div>
            <div class="container__right-popup-body-bottom">
                <div class="container__popup-footer">
                    <button @click="closeUserDetail" class="btn btn-close">
                        Đóng
                    </button>
                    <button class="btn btn-save" @keydown.tab.prevent="() => processTags('UserName')" @click="saveUser" ref="saveUser">
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </div>
        <h-dialog v-if="isShowDialog" :textDialog="textDialog" :handleCloseInputError="onCloseDialogUser"
            :isDialogInputError="isDialogInputError" :isDialogDelete="isDialogDelete" ref="dialogRef">
        </h-dialog>
    </div>
</template>
<script>
import userService from '@/services/userService';
import { formatDateWithSlash } from '@/utils/formatDate';
import { handleApiErr } from '@/utils/handleApiErr';
import { compareObject } from '@/utils/compartObject';
export default {
    name: "UserDetail",
    data() {
        return {
            user: {},
            isEditUser: true,
            isShowDialog: false,
            isDialogInputError: false,
            isDialogDelete: false,
            textDialog: [],
            isDialogOverlayShow: false,
            userErrors: {},
        }
    },
    props: {
        userInput: Object,
        getUserList: Function,
        isEdit: Boolean,
        actionSuccess: Function,
        openAddForm: Function,
    },
    created() {
        let jsonObjectString = JSON.stringify(this.userInput);
        this.user = JSON.parse(jsonObjectString);
        this.isEditUser = this.isEdit;
    },
    computed: {

    },
    mounted() {
        /**
        * Mô tả: focus vào Mã nhân viên khi mở form
        * created by : DDPHUONG
        * created date: 15-12-2023 22:26:59
        */
        this.$refs.UserName.focus();
    },
    methods: {
        formatDateWithSlash,
        formattedDate(date) {
            // Gọi hàm format date để định dạng ngày
            return this.formatDateWithSlash(date);
        },
        updateDate(event, field) {
            if (event && event.target) {
                // Cập nhật giá trị của field khi người dùng thay đổi input
                this.user[field] = event.target.value;
            }
            if (this.userErrors)
                delete this.userErrors[field]
        },
        processTags(field) {
            this.$refs[field].focus();
        },
        closeUserDetail() {
            this.$emit("onCloseDialog");
        },
        closeUserDetailByIcon() {
            if (this.isEditUser == true) { // trạng thái sửa
                //kiểm tra thay đổi dữ liệu
                //xuất hiện dialog
                if (!compareObject(this.user, this.userInput)) {
                    this.$emit("onCloseDialogByIcon");
                }
                else {
                    this.closeUserDetail();
                }
            }
            else { // trạng thái thêm
                if (!compareObject(this.user, this.userInput)) {
                    this.$emit("onCloseDialogByIcon");
                }
                else {
                    this.closeUserDetail();
                }
            }
        },
        async btnEditOnClick() {
            // validate dữ liệu
            // gọi api cất dữ liệu
            // Đọc thông tin trả về (response) và phản hồi kết quả
            try {
                if(this.user.role == true){
                    this.user.role = "admin"
                }
                else {
                    this.user.role = "user"
                }
                const res = await userService.update(
                    this.user.UserId,
                    this.user
                );
                if (res.status === 200) {
                    this.actionSuccess(
                        "Update thành công",
                        true
                    );
                    this.getUserList();
                    this.closeUserDetail();
                }
            }
            catch (error) {
                this.isDialogInputError = true;
                this.userErrors = handleApiErr(error, this.textDialog);
                this.isShowDialog = true;
                this.$nextTick(() => {
                    // Tập trung vào nút đóng
                    this.$refs.dialogRef.$refs.closeButton.focus();
                });
                this.isDialogOverlayShow = true;
            }
        },
        async btnAddOnClick() {
            try {
                const res = await userService.create(this.user);
                if (res.status === 200) {
                    this.actionSuccess(
                        "Thêm mới thành công",
                        true
                    );
                    this.getUserList();
                    this.closeUserDetail();
                }
            }
            catch (error) {
                this.isDialogInputError = true;
                this.userErrors = handleApiErr(error, this.textDialog);
                this.isShowDialog = true;
                this.$nextTick(() => {
                    // Tập trung vào nút đóng
                    this.$refs.dialogRef.$refs.closeButton.focus();
                });
                this.isDialogOverlayShow = true;
            }
        },
        saveUser() {
            if (this.isEditUser === true) {
                this.btnEditOnClick();
            }
            else {
                this.btnAddOnClick();
            }
        },
        onCloseDialogUser() {
            this.isShowDialog = false;
            if (this.userErrors.UserName) {
                this.$refs.UserName.focus();
            }
            else if(this.userErrors.Email){
                this.$refs.Email.focus();
            }
            else {
                const firstErrorField = Object.keys(this.userErrors)[0];
                if (firstErrorField) {
                    const errorFieldElement = this.$refs[firstErrorField];

                    if (errorFieldElement) {
                        errorFieldElement.focus();
                    }
                }
            }
            this.textDialog = [];
            this.isDialogOverlayShow = false;
        },
        handleChangeInput(fieldName) {
            if (this.userErrors) {
                delete this.userErrors[fieldName]
            }
        },
    }
}
</script>

<style scoped>
@import url(../../css/components/userdetail.css);
.invalid {
    border: 1px solid red !important;
}
.dialog-overlay {
    position: absolute;
    background-color: rgba(128, 128, 128, 0.107);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
}
</style>