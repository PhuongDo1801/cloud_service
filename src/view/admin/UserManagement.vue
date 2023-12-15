<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="container__right-overlay" :style="{
        display: isShowOverlay ? 'block' : 'none',
    }"></div>
    <div v-if="isDialogOverlayShow" class="dialog-overlay"></div>
    <h-dialog v-if="isShowDialogDelete" :textDialog="textDialog" :handleCancelDelete="onCloseDialogUser"
        :handleAccept="deleteUser" :handleCloseInputError="onCloseDialogUser"
        :isDialogDelete="isDialogDelete" :isDialogInputError="isDialogInputError">
    </h-dialog>
    <h-dialog v-if="isShowDialogChagneData" :textDialog="textDialog" :handleCancelDelete="onCloseDialogUser"
        :handleAccept="updateUser" :handleDataChange="handleDataChange"
        :isDialogDataChange="isDialogDataChange">
    </h-dialog>
    <h-toast :textMessage="textMessage" :isDone="isDone" v-if="isDone"></h-toast>
    <UserDetail v-if="isShowDetail" @onCloseDialog="onCloseDialog" :userInput="userSelected"
        :getUserList="getUserList" :isEdit="isEditUser" :actionSuccess="actionSuccess" 
        @onCloseDialogByIcon="onCloseDialogByIcon" 
        :openAddForm="openAddForm"
        ref="userDetail">
    </UserDetail>
    <div class="container__right-main-top">
        <span>Danh sách người dùng</span>
        <!-- <button id="btn-add-user" @click="openAddForm">Thêm người dùng</button> -->
    </div>
    <div class="container__right-main-body">
        <div class="container__right-search">
            <div class="search-input--right">
                <div class="container__right-search-input">
                    <input title="Tìm kiếm" 
                    placeholder="Tìm kiếm" 
                    v-model="textSearch" />
                    <i class="search-icon" title="Tìm kiếm"></i>
                </div>
                <div class="refresh-icon" @click="refreshData"></div>
            </div>
        </div>
        <div class="container__right-table">
            <div class="container__table">
                <table id="table-user-list">
                <thead>
                    <tr>
                        <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" @change="handleAllCheckboxChange"/>
                        </th>
                        <th v-for="column in tableColumn" :key="column.key" :class="column.class" :style="column.style" :title="column.title">
                            {{ column.text }}
                        </th>
                    </tr>
                </thead>
                <tbody class="table__body" v-if="users.length>0">
                    <tr @dblclick="showUserDetail(item)" v-for="(item, index) in users" :key="index">
                        <td class="text-align-center" @dblclick.stop="">
                            <input type="checkbox"/>                          
                        </td>
                        <td class="text-align-left">{{ item.UserName }}</td>
                        <td class="text-align-left">{{ item.Email }}</td>
                        <td class="text-align-left">{{ item.PhoneNumber }}</td>
                        <td class="text-align-left">{{ item.IdentityNumber }}</td>
                        <!-- <td class="text-align-left">{{ getGenderLabel(item.Gender) }}</td> -->
                        <td class="text-align-center">{{ formatDateWithDash(item.DateOfBirth) }}</td> 
                        <td class="text-align-center" @dblclick.stop="">
                            <button class="btn btn-delete-user" @click="showDeleteUserDialog((item.UserId))">
                                Xoá
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="container__right-main-footer">
                <div class="container__right-main-footer-left">
                    <span>
                        Total:
                        <strong>{{ this.totalUser}}</strong>
                    </span>
                </div>

                <div class="container__right-main-footer-right">
                    <div class="container__footer-right-item-first">
                        <span>Số bản ghi/trang: </span>
                        <span>&nbsp; {{ this.currentPageSize }} &nbsp;</span>
                        <div class="option-paging">
                            <div class="dropdown-gray-d-icon" @click="handleShowPageList"></div>
                            <ul v-show="isShowPaging" class="footer__pagesize-list" v-click-outside="ClickOutsidePaging"> 
                                <li @click="handleChangeRowPage(item.value)" v-for="item in pagings" :key="item">
                                    {{ item.value }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="container__footer-right-item-second">
                        <span>{{ totalUser > 0 ? ((this.page-1)*this.currentPageSize+1) : 0 }} </span>
                        <span> - </span>
                        <span>{{ record() }}</span>

                        <span> &nbsp; bản ghi </span>
                    </div>
                    <div class="container__footer-right-item-third">
                        <div @click="handleBackPage" :class="{'arrow-left-icon': !isDisableLeft, 'arrow-left-icon-disable': isDisableLeft}">
                        </div>
                        <div @click="handleNextPage" :class="{'arrow-right-icon': !isDisableRight, 'arrow-right-icon-disable': isDisableRight}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDateWithDash } from '@/utils/formatDate';
import userService from '@/services/userService';
import { pagings } from '@/constains/paging';
import { tableColumn } from '@/constains/tableColumn';
import UserDetail from '@/view/admin/UserDetail.vue';
export default {
    name: "UserManagement",
    components: { UserDetail },
    data(){
        return {
            users: [],
            tableColumn,
            pagings,
            currentPageSize: 20,
            textSearch: "",
            page: 1,
            //limit: 10,
            totalSizePage: 0,
            totalUser: null,
            isDisableLeft: true,
            isDisableRight: false,
            isLoading: false,
            idTimeOut: null,
            isShowPaging: null,
            isShowDialogDelete: false,
            textDialog: [],
            isDialogDelete: false,
            isDialogInputError: false,
            isDialogDataChange: false,
            isDone: false,
            textMessage: "",
            isEditUser: null,
            idUser: null,
            userSelected: {},
            isShowOverlay: false,
            isDialogOverlayShow: false,
            isShowDialogChagneData: false,
            isShowDetail: false,
        }
    },
    created() {
        this.getUserList();
    },
    watch: {
        textSearch() {
            if (this.idTimeOut !== null) {
                clearTimeout(this.idTimeOut);
            }
            const id = setTimeout(() => {
                this.searchUser();
            }, 600);
            this.idTimeOut = id;
        },
    },
    methods: {
        onCloseDialogUser() {
            //this.isShowOverlay = false;
            if(this.isShowDialogDelete == true){
                this.isShowDialogDelete = false;
                this.isShowOverlay = false;
            }
            if(this.isShowDialogChagneData == true){
                this.isShowDialogChagneData = false;
                // this.isShowDetail = false;
                this.isDialogOverlayShow = false;
            }
            if(this.isShowDialogDelMul == true){
                this.isShowDialogDelMul = false;
                this.isShowOverlay = false;
            }
            this.textDialog = [];
        },
        actionSuccess(text, isDone) {
            this.textMessage = text;
            this.isDone = isDone;
            setTimeout(() => {
                this.isDone = false;
            }, 1800);
        },
        onCloseDialog() {
            this.isShowDetail = false;
            this.isShowOverlay = false;
        },
        onCloseDialogByIcon(){
            this.isDialogDataChange = true;
            this.isShowDialogChagneData = true;
            this.isDialogOverlayShow = true;
        },
        async openAddForm() {
            this.userSelected = {};
            this.isShowDetail = true;
            this.isShowOverlay = true;
            this.isEditUser = false;
        },
        handleDataChange(){
            if(this.isShowDialogChagneData == true){
                this.isShowDetail = false;
                this.isShowDialogChagneData = false;
                this.isDialogOverlayShow = false;
                this.isShowOverlay = false;
            }
            this.textDialog = [];
        },
        showUserDetail(user) {
            this.isEditUser = true;
            this.userSelected = user;
            this.isShowDetail = true;
            this.isShowOverlay = true;
        },
        showDeleteUserDialog(id) {
            //this.Code = code;
            this.isDialogDelete = true;
            this.idUser = id;
            this.isShowOverlay = true;
            this.isShowDialogDelete = true;
        },
        formatDateWithDash,
        ClickOutsidePaging(){
            this.isShowPaging = null;
        },
        refreshData(){
            this.page = 1;
            this.getUserList();
        },
        record(){
            if(this.page < this.totalSizePage){
                return this.page*this.currentPageSize;
            }
            else{
                return this.totalUser;
            }
        },
        async deleteUser() {
            try {
                const res = await userService.delete(this.idUser);
                if (res.status === 200) {
                    // this.isLoading = true;
                    this.getUserList();
                    this.actionSuccess(
                        "Xoá thành công",
                        true
                    );
                    // this.isLoading = false;
                    this.isShowDialogDelete = false;
                    this.isShowOverlay = false;
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        updateUser(){
            this.$refs.userDetail.saveUser();
            this.isShowDialogChagneData = false;
            this.isDialogOverlayShow = false;
        },
        async getUserList() {
            try {
                this.isLoading = true;
                const res =  await userService.getList(this.textSearch, this.page, this.currentPageSize);
                this.users = res.Data;
                this.totalUser = res.TotalRecord;
                this.totalSizePage = Math.ceil(res.TotalRecord / this.currentPageSize);
                this.isLoading = false;
            }
            catch (error) {
                console.log(error);
            }
        },
        async searchUser() {
            try {
                this.page =  1;
                const res = await userService.getList(this.textSearch, 1, this.currentPageSize);
                this.totalUser = res.TotalRecord;
                this.totalSizePage = Math.ceil(res.TotalRecord / this.currentPageSize);
                this.users = res.Data;
                if(this.totalSizePage == 1){
                    this.isDisableRight = true;
                }
                else{
                    this.isDisableRight = false;
                }  
                this.isDisableLeft = true;
            } catch (error) {
                console.log(error);
            }
        },
        async handleBackPage() {
            try {
                if (this.page > 1) {
                    this.page = this.page - 1;
                    this.isDisableRight = false;
                    if(this.page == 1){
                        this.isDisableLeft = true;
                    }
                    else{
                        this.isDisableLeft = false;
                    }
                    const res = await userService.getList(this.textSearch, this.page, this.currentPageSize);
                    this.users = res.Data;
                }
            } catch (error) {
                console.log(error)
            }
        },
        /**
        * Mô tả: trang phía sau
        * created by : DDPHUONG
        * created date: 17-06-2023 14:34:51
        */
        async handleNextPage() {
            try {
                if (this.page < this.totalSizePage) {
                    this.page = this.page + 1;
                    this.isDisableLeft = false;
                    if(this.page == this.totalSizePage){
                        this.isDisableRight = true;
                    }
                    else{
                        this.isDisableRight = false;
                    }
                    const res = await userService.getList(this.textSearch, this.page, this.currentPageSize);
                    this.users = res.Data;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async handleChangeRowPage(value) {
            this.currentPageSize = value;
            this.page = 1;
            this.getUserList();
            this.isShowPaging = false;
            this.totalSizePage = Math.ceil(this.totalUser / this.currentPageSize);
            if(this.totalSizePage == 1){
                this.isDisableRight = true;
            }
            else{
                this.isDisableRight = false;
            }
            this.isDisableLeft = true;
            //this.zIndex = value;
        },
        handleShowPageList() {
            this.isShowPaging = !this.isShowPaging;
        },
    }
}
</script>

<style scoped>
@import url(../../css/components/usermanage.css);
</style>