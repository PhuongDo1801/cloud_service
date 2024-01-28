<template>
    <div class="create-budget-form">
      <h2>Tạo Kế Hoạch Ngân Sách</h2>
      <form @submit.prevent="submitForm">
        <label for="budgetName">Tên Ngân Sách:</label>
        <input v-model="createBudgetFormData.budgetName" required>
  
        <label for="budgetLimit">Ngân Sách Giới Hạn:</label>
        <input v-model="createBudgetFormData.budgetLimit" type="number" required>
  
        <label for="startDate">Ngày Bắt Đầu:</label>
        <input v-model="createBudgetFormData.startDate" type="date" required>
  
        <label for="endDate">Ngày Kết Thúc:</label>
        <input v-model="createBudgetFormData.endDate" type="date" required>
  
        <label for="limitPercent">Phần Trăm Giới Hạn:</label>
        <input v-model="createBudgetFormData.limitPercent" type="number" required>
  
        <label for="email">Email Thông Báo:</label>
        <input v-model="createBudgetFormData.email" type="email" required>
  
        <button type="submit">Tạo Ngân Sách</button>
        <button type="button" @click="closeForm">Hủy</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "BudgetCreate",
    data() {
      return {
        createBudgetFormData: {
          budgetName: '',
          budgetLimit: null,
          startDate: '',
          endDate: '',
          limitPercent: null,
          email: '',
        },
      };
    },
    methods: {
      submitForm() {
        this.$emit('submit', this.createBudgetFormData);
        this.closeForm();
      },
      closeForm() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .create-budget-form {
    background-color: #fff;
    max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 999;
  position: absolute; /* Thêm position absolute cho form */
  top: 50%; /* Dịch form lên 50% so với phần tử cha */
  left: 50%; /* Dịch form sang trái 50% so với phần tử cha */
  transform: translate(-50%, -50%); /* Dịch form về giữa hoàn toàn */
  }
  
  .create-budget-form h2 {
    margin-bottom: 15px;
  }
  
  .create-budget-form label {
    display: block;
    margin-bottom: 8px;
  }
  
  .create-budget-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
  }
  
  .create-budget-form button {
    padding: 10px;
    background-color: #50B83C;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .create-budget-form button:hover {
    background-color: #4acf2f;
  }
  
  .create-budget-form button:focus {
    background-color: #067933;
  }
  </style>
  