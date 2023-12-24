<template>
    <div v-show="isLoading" class="background--loading">
        <div class="icon--loading"></div>
    </div>
    <div class="service-page-title">
        <span>Các dịch vụ AWS</span>
    </div>
    <div class="service-page">
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
                        <th v-for="column in serviceUserTableColumn" :key="column.key" :class="column.class" :style="column.style" :title="column.title">
                            {{ column.text }}
                        </th>
                    </tr>
                </thead>
                <tbody class="table__body" v-if="services.length>0">
                    <tr @dblclick="showServiceDetail(item)" v-for="(item, index) in services" :key="index">
                        <td class="text-align-left">{{ item.ServiceName }}</td>
                        <td class="text-align-left">{{ item.ServiceCode }}</td>
                        <td class="text-align-left">{{ item.ProductFamily }}</td>
                        <!-- <td class="text-align-left">{{ item.EngineCode }}</td> -->
                        <td class="text-align-left">{{ item.UsageType }}</td>
                        <td class="text-align-left">{{ item.LocationType }}</td>
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
import { serviceUserTableColumn } from "@/constains/serviceUserTableColumn";
import AwsService from "@/services/AwsService";
import { pagings } from '@/constains/paging';
export default {
    name: "AWSService",
    data(){
        return {
            services: [],
            serviceUserTableColumn,
            pagings,
            isLoading: false,
            totalService: null,
            isDisableLeft: true,
            isDisableRight: false,
            totalSizePage: null,
            textSearch: "",
            page: 1,
            currentPageSize: 5,
            isShowPaging: false,
        }
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
    created() {
        this.getServiceList();
    },
    methods: {
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
    },
    
}
</script>

<style>
.service-page-title {
    width: 100%;
    height: 68px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.service-page-title span {
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
}
.service-page {
    background-color: #fff;
    padding: auto;
}
</style>