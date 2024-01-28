<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="container__right-overlay" :style="{
        display: isShowOverlay ? 'block' : 'none',
    }"></div>
    <div v-if="isDialogOverlayShow" class="dialog-overlay"></div>
    <h-dialog v-if="isShowDialogDelete" :textDialog="textDialog" :handleCancelDelete="onCloseDialogService"
        :handleAccept="deleteService" :handleCloseInputError="onCloseDialogService"
        :isDialogDelete="isDialogDelete" :isDialogInputError="isDialogInputError">
    </h-dialog>
    <h-dialog v-if="isShowDialogChagneData" :textDialog="textDialog" :handleCancelDelete="onCloseDialogService"
        :handleAccept="updateService" :handleDataChange="handleDataChange"
        :isDialogDataChange="isDialogDataChange">
    </h-dialog>
    <h-toast :textMessage="textMessage" :isDone="isDone" v-if="isDone"></h-toast>
    <ServiceDetail v-if="isShowDetail" @onCloseDialog="onCloseDialog" :serviceInput="serviceSelected"
        :getServiceList="getServiceList" :isEdit="isEditService" :actionSuccess="actionSuccess" 
        @onCloseDialogByIcon="onCloseDialogByIcon" 
        :openAddForm="openAddForm"
        ref="serviceDetail">
    </ServiceDetail>
    <div class="container__right-main-top">
        <span>Danh sách dịch vụ</span>
        <div class="add-service">
            <input type="text" v-model="serviceCodeRequest">
            <button id="btn-add-service" @click="AddService">Add service</button>
        </div>  
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
                <table id="table-service-list">
                <thead>
                    <tr>
                        <!-- <th class="text-align-center" style="min-width: 50px;" type="checkbox">
                            <input type="checkbox" @change="handleAllCheckboxChange"/>
                        </th> -->
                        <th v-for="column in serviceTableColumn" :key="column.key" :class="column.class" :style="column.style" :title="column.title">
                            {{ column.text }}
                        </th>
                    </tr>
                </thead>
                <tbody class="table__body" v-if="services.length>0">
                    <tr @dblclick="showServiceDetail(item)" v-for="(item, index) in services" :key="index">
                        <!-- <td class="text-align-center" @dblclick.stop="">
                            <input type="checkbox"/>                          
                        </td> -->
                        <td class="text-align-left">{{ item.ServiceName }}</td>
                        <td class="text-align-left">{{ item.ServiceCode }}</td>
                        <td class="text-align-left">{{ item.ProductFamily }}</td>
                        <!-- <td class="text-align-left">{{ item.EngineCode }}</td> -->
                        <td class="text-align-left">{{ item.UsageType }}</td>
                        <td class="text-align-left">{{ item.LocationType }}</td>
                        <!-- <td class="text-align-left">{{ item.InstanceFamily }}</td> -->
                        <!-- <td class="text-align-left">{{ item.Operation }}</td> -->
                        <!-- <td class="text-align-left">{{ item.DatabaseEngine }}</td> -->
                        <td class="text-align-center" @dblclick.stop="">
                            <button class="btn btn-delete-service" @click="showDeleteServiceDialog((item.ServiceId))">
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
                        <strong>{{ this.totalService}}</strong>
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
                        <span>{{ totalService > 0 ? ((this.page-1)*this.currentPageSize+1) : 0 }} </span>
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
import AwsService from '@/services/AwsService';
import { pagings } from '@/constains/paging';
import { serviceTableColumn } from '@/constains/serviceTableColumn';
import ServiceDetail from '@/view/admin/ServiceDetail.vue';
export default {
    name: "ServiceManagement",
    components: { ServiceDetail },
    data(){
        return {
            services: [],
            serviceTableColumn,
            pagings,
            serviceCodeRequest: "",
            providerId: "2082ec9c-3333-4f95-91f4-65a9d61a50ae",
            currentPageSize: 10,
            textSearch: "",
            page: 1,
            //limit: 10,
            totalSizePage: 0,
            totalService: null,
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
            isEditService: null,
            idService: null,
            serviceSelected: {},
            isShowOverlay: false,
            isDialogOverlayShow: false,
            isShowDialogChagneData: false,
            isShowDetail: false,
        }
    },
    created() {
        this.getServiceList();
    },
    watch: {
        textSearch() {
            if (this.idTimeOut !== null) {
                clearTimeout(this.idTimeOut);
            }
            const id = setTimeout(() => {
                this.searchService();
            }, 600);
            this.idTimeOut = id;
        },
    },
    methods: {
        onCloseDialogService() {
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
            this.serviceSelected = {};
            this.isShowDetail = true;
            this.isShowOverlay = true;
            this.isEditService = false;
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
        showServiceDetail(service) {
            this.isEditService = true;
            this.serviceSelected = service;
            this.isShowDetail = true;
            this.isShowOverlay = true;
        },
        showDeleteServiceDialog(id) {
            //this.Code = code;
            this.isDialogDelete = true;
            this.idService = id;
            this.isShowOverlay = true;
            this.isShowDialogDelete = true;
        },
        ClickOutsidePaging(){
            this.isShowPaging = null;
        },
        refreshData(){
            this.page = 1;
            this.getServiceList();
        },
        record(){
            if(this.page < this.totalSizePage){
                return this.page*this.currentPageSize;
            }
            else{
                return this.totalService;
            }
        },
        async deleteService() {
            try {
                const res = await AwsService.delete(this.idService);
                if (res.status === 200) {
                    // this.isLoading = true;
                    this.getServiceList();
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
        updateService(){
            this.$refs.serviceDetail.saveService();
            this.isShowDialogChagneData = false;
            this.isDialogOverlayShow = false;
        },
        async getServiceList() {
            try {
                this.isLoading = true;
                const res =  await AwsService.getList(this.textSearch, this.page, this.currentPageSize);
                this.services = res.Data;
                this.totalService = res.TotalRecord;
                this.totalSizePage = Math.ceil(res.TotalRecord / this.currentPageSize);
                this.isLoading = false;
            }
            catch (error) {
                console.log(error);
                this.isLoading = false;
            }
        },
        async searchService() {
            try {
                this.page =  1;
                const res = await AwsService.getList(this.textSearch, 1, this.currentPageSize);
                this.totalService = res.TotalRecord;
                this.totalSizePage = Math.ceil(res.TotalRecord / this.currentPageSize);
                this.services = res.Data;
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
                    const res = await AwsService.getList(this.textSearch, this.page, this.currentPageSize);
                    this.services = res.Data;
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
                    const res = await AwsService.getList(this.textSearch, this.page, this.currentPageSize);
                    this.services = res.Data;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async handleChangeRowPage(value) {
            this.currentPageSize = value;
            this.page = 1;
            this.getServiceList();
            this.isShowPaging = false;
            this.totalSizePage = Math.ceil(this.totalService / this.currentPageSize);
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
        async AddService(){
            try {
                const res = await AwsService.InsertByServiceCode(this.serviceCodeRequest, this.providerId)
                console.log(res);
                if(res.status == 200){
                    this.getServiceList();
                    this.serviceCodeRequest = "";
                }
            }
            catch(error){
                console.log(error);
            }
            
        }
    }
}
</script>

<style scoped>
@import url(../../css/components/servicemanage.css);
</style>