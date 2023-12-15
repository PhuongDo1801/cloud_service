<template>
  <div class="container__right-navbar">
    <div class="container__right-navbar-left">
      <i class="menu-icon"></i>
      <span>HUST</span>
      <!-- <img src="../assets/icon/dropdown.png" alt="" /> -->
      <!-- <div class="dropdown-gray-d-icon"></div> -->
    </div>
    <div class="container__right-navbar-right">
      <i class="bell-icon" title="Thông báo"></i>
      <i class="user-icon" title="Thông tin"></i>
      <span>{{ username }}</span>
      <!-- <img src="../assets/icon/dropdown.png" alt="" /> -->
      <!-- <div class="dropdown-gray-d-icon"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  computed: {
    username() {
      // Lấy tên người dùng từ localStorage hoặc nơi khác
      const storedUsername = localStorage.getItem("username");

      // Trả về tên người dùng, nếu không có trả về một giá trị mặc định hoặc chuỗi trống
      return storedUsername || "Guest";
    }
  }
}
</script>

<style></style>