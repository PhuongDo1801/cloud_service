<template>
    <div
      class="toast-message"
      :class="{
        active: 
        isDone,
      }"
    >
      <div class="toast-message__left">
        <div class="toast-message__left-icon">
          <div class="done-icon"></div>
        </div>
        <div class="toast-message__left-content">
          <span>{{ textMessage }}</span>
        </div>
      </div>
      <div class="toast-message__right">
        <!-- <div class="toast-message__right-content">
          <span>{{ this.$_MISAResource[$_LanguageCode].toastMsg.undo }}</span>
        </div>
        <div class="toast-message__right-icon">
          <img src="../../assets/icon/close.svg" alt="" />
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HustToastMessage",
    props: {
      textMessage: String,
      isDone: Boolean,
    },
  };
  </script>
  
<style scoped>
@import url(../../css/components/toast-mes.css);
</style>