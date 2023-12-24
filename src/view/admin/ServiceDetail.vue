<template>

    <div class="container__right-popup">
        <div v-if="isDialogOverlayShow" class="dialog-overlay"></div>
        <div class="container__right-icon-wraper">
            <div class="info-icon" title="Thông tin"></div>
            <div class="close-icon" id="close-icon-add-service" @click="closeServiceDetailByIcon" title="Đóng">
            </div>
        </div>
        <div class="container__right-popup-top">
            <span v-if="!isEditService">Thêm mới dịch vụ</span>
            <span v-if="isEditService">Thông tin dịch vụ</span>
        </div>
        <div class="container__right-popup-body">
            <div class="container__right-popup-body-top">
                <div class="input-box">
                    <label for="">
                        ServiceName
                    </label>
                    <input title="ServiceName" type="text" v-model="service.ServiceName" :class="{
                        invalid:
                            serviceErrors.ServiceName
                    }" @input="() => handleChangeInput('ServiceName')" ref="ServiceName" />
                </div>
                <div class="input-box">
                    <label for="">
                        ServiceCode
                    </label>
                    <input title="Email" type="text" v-model="service.ServiceCode" :class="{
                        invalid:
                        serviceErrors.ServiceCode
                    }" @input="() => handleChangeInput('Email')" ref="ServiceCode" />
                </div>
                <div class="input-box">
                    <label for="">
                        ProductFamily
                    </label>
                    <input title="Số điện thoại" type="text" v-model="service.ProductFamily" :class="{
                        invalid:
                        serviceErrors.ProductFamily
                    }" @input="() => handleChangeInput('ProductFamily')" ref="ProductFamily" />
                </div>
                <div class="input-box">
                    <label for="">
                        EngineCode
                    </label>
                    <input title="CCCD" type="text" v-model="service.EngineCode" :class="{
                        invalid:
                        serviceErrors.EngineCode
                    }" @input="() => handleChangeInput('EngineCode')" ref="EngineCode" />
                </div>
                <div class="input-box">
                    <label for="">
                        UsageType
                    </label>
                    <input title="CCCD" type="text" v-model="service.UsageType" :class="{
                        invalid:
                        serviceErrors.UsageType
                    }" @input="() => handleChangeInput('UsageType')" ref="UsageType" />
                </div>
                <div class="input-box">
                    <label for="">
                        LocationType
                    </label>
                    <input title="CCCD" type="text" v-model="service.LocationType" :class="{
                        invalid:
                        serviceErrors.LocationType
                    }" @input="() => handleChangeInput('LocationType')" ref="LocationType" />
                </div>
                <div class="input-box">
                    <label for="">
                        InstanceFamily
                    </label>
                    <input title="CCCD" type="text" v-model="service.InstanceFamily" :class="{
                        invalid:
                        serviceErrors.InstanceFamily
                    }" @input="() => handleChangeInput('InstanceFamily')" ref="InstanceFamily" />
                </div>
                <div class="input-box">
                    <label for="">
                        Operation
                    </label>
                    <input title="CCCD" type="text" v-model="service.Operation" :class="{
                        invalid:
                        serviceErrors.Operation
                    }" @input="() => handleChangeInput('Operation')" ref="Operation" />
                </div>
                <div class="input-box">
                    <label for="">
                        DatabaseEngine
                    </label>
                    <input title="CCCD" type="text" v-model="service.DatabaseEngine" :class="{
                        invalid:
                        serviceErrors.DatabaseEngine
                    }" @input="() => handleChangeInput('DatabaseEngine')" ref="DatabaseEngine" />
                </div>
                <div class="input-box">
                    <label for="">
                        Description
                    </label>
                    <input title="CCCD" type="text" v-model="service.Description" :class="{
                        invalid:
                        serviceErrors.Description
                    }" @input="() => handleChangeInput('Description')" ref="Description" />
                </div>
            </div>
            <div class="container__right-popup-body-bottom">
                <div class="container__popup-footer">
                    <button @click="closeServiceDetail" class="btn btn-close">
                        Đóng
                    </button>
                    <button class="btn btn-save" @keydown.tab.prevent="() => processTags('ServiceName')" @click="saveService" ref="saveService">
                        Lưu thông tin
                    </button>
                </div>
            </div>
        </div>
        <h-dialog v-if="isShowDialog" :textDialog="textDialog" :handleCloseInputError="onCloseDialogService"
            :isDialogInputError="isDialogInputError" :isDialogDelete="isDialogDelete" ref="dialogRef">
        </h-dialog>
    </div>
</template>
<script>
import AwsService from '@/services/AwsService';
import { formatDateWithSlash } from '@/utils/formatDate';
import { handleApiErr } from '@/utils/handleApiErr';
import { compareObject } from '@/utils/compartObject';
export default {
    name: "ServiceDetail",
    data() {
        return {
            service: {},
            isEditService: true,
            isShowDialog: false,
            isDialogInputError: false,
            isDialogDelete: false,
            textDialog: [],
            isDialogOverlayShow: false,
            serviceErrors: {},
        }
    },
    props: {
        serviceInput: Object,
        getServiceList: Function,
        isEdit: Boolean,
        actionSuccess: Function,
        openAddForm: Function,
    },
    created() {
        let jsonObjectString = JSON.stringify(this.serviceInput);
        this.service = JSON.parse(jsonObjectString);
        this.isEditService = this.isEdit;
    },
    computed: {

    },
    mounted() {
        /**
        * Mô tả: focus vào Mã nhân viên khi mở form
        * created by : DDPHUONG
        * created date: 15-12-2023 22:26:59
        */
        this.$refs.ServiceName.focus();
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
                this.service[field] = event.target.value;
            }
            if (this.serviceErrors)
                delete this.serviceErrors[field]
        },
        processTags(field) {
            this.$refs[field].focus();
        },
        closeServiceDetail() {
            this.$emit("onCloseDialog");
        },
        closeServiceDetailByIcon() {
            if (this.isEditService == true) { // trạng thái sửa
                //kiểm tra thay đổi dữ liệu
                //xuất hiện dialog
                if (!compareObject(this.service, this.serviceInput)) {
                    this.$emit("onCloseDialogByIcon");
                }
                else {
                    this.closeServiceDetail();
                }
            }
            else { // trạng thái thêm
                if (!compareObject(this.service, this.serviceInput)) {
                    this.$emit("onCloseDialogByIcon");
                }
                else {
                    this.closeServiceDetail();
                }
            }
        },
        async btnEditOnClick() {
            // validate dữ liệu
            // gọi api cất dữ liệu
            // Đọc thông tin trả về (response) và phản hồi kết quả
            try {
                if(this.service.role == true){
                    this.service.role = "admin"
                }
                else {
                    this.service.role = "service"
                }
                const res = await AwsService.update(
                    this.service.ServiceId,
                    this.service
                );
                if (res.status === 200) {
                    this.actionSuccess(
                        "Update thành công",
                        true
                    );
                    this.getServiceList();
                    this.closeServiceDetail();
                }
            }
            catch (error) {
                this.isDialogInputError = true;
                this.serviceErrors = handleApiErr(error, this.textDialog);
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
                const res = await AwsService.create(this.service);
                if (res.status === 200) {
                    this.actionSuccess(
                        "Thêm mới thành công",
                        true
                    );
                    this.getServiceList();
                    this.closeServiceDetail();
                }
            }
            catch (error) {
                this.isDialogInputError = true;
                this.serviceErrors = handleApiErr(error, this.textDialog);
                this.isShowDialog = true;
                this.$nextTick(() => {
                    // Tập trung vào nút đóng
                    this.$refs.dialogRef.$refs.closeButton.focus();
                });
                this.isDialogOverlayShow = true;
            }
        },
        saveService() {
            if (this.isEditService === true) {
                this.btnEditOnClick();
            }
            else {
                this.btnAddOnClick();
            }
        },
        onCloseDialogService() {
            this.isShowDialog = false;
            if (this.serviceErrors.ServiceName) {
                this.$refs.ServiceName.focus();
            }
            else if(this.serviceErrors.Email){
                this.$refs.Email.focus();
            }
            else {
                const firstErrorField = Object.keys(this.serviceErrors)[0];
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
            if (this.serviceErrors) {
                delete this.serviceErrors[fieldName]
            }
        },
    }
}
</script>

<style scoped>
@import url(../../css/components/servicedetail.css);
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