<template>
    <!-- <header>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </header> -->

    <main>
      <!-- Nội dung của trang hiện tại sẽ được hiển thị ở đây -->
      <router-view></router-view>
    </main>

    <footer>
      <!-- Chân trang hoặc các thành phần khác -->
    </footer>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import url('./css/main.css');
</style>
