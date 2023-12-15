<template>
    <div class="container__right-dialog" ref="dialogElement">
      <div class="container__right-dialog-top">
        <i
          v-if="isDialogDelete"
          class="warning-icon"
        ></i>
        <span v-if="isDialogDelete">Bạn có chắc chắn muốn xoá không?</span>
        <i
          v-if="isDialogDataChange"
          class="question-icon"
        ></i>
        <span v-if="isDialogDataChange">Dữ liệu đã bị thay đổi. Bạn có muốn lưu không?</span>
        <i v-if="isDialogInputError" class="red-warning-icon"></i>
        <ul class="dialog-content-list" v-if="isDialogInputError">
          <li v-for="text in textDialog" :key="text">{{ text }}</li>
        </ul>
      </div>
      <hr />
      <div class="container__right-dialog-bottom">
        <button
          v-if="isDialogDelete || isDialogDataChange"
          @click="handleCancelDelete"
          id="btn-not-allow-delete"
          class="container__right-dialog-btn cancel-btn"
          ref="cancelButton"
        >
        {{ isDialogDelete ? 'Không' : 'Huỷ' }}
        </button>
        <div>
            <button
            v-if="isDialogDataChange"
            @click="handleDataChange"
            class="container__right-dialog-btn no-btn"
            ref="noButton">
            Không
            </button>
            <button
            v-if="isDialogDelete || isDialogDataChange"
            @click="handleAccept"
            id="btn-allow-delete"
            class="container__right-dialog-btn accept-btn"
            ref="acceptButton"
            >
            Có
            </button>
          </div>
        <button
          v-if="isDialogInputError"
          @click="handleCloseInputError"
          class="container__right-dialog-btn close-btn"
          ref="closeButton"
        >
        Đóng
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HustDialog",
    props: {
      handleAccept: Function,
      handleCancelDelete: Function,
      handleDataChange:Function,
      handleCloseInputError: Function,
      textDialog: Array,
      isShowDialog: Boolean,
      isDialogDelete: Boolean,
      isDialogInputError: Boolean,
      isDialogDataChange: Boolean,
      Code: String,
    },
  };
  </script>
  
  <style  scoped>
  @import url(../../css/components/dialog.css);
    .dialog-content-list{
      margin-left: 24px;
    }
  
    .dialog-content-list li{
       margin: 5px;
    }
  </style>