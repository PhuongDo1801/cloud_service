<template>
  <div class="container">
    <TheSidebar></TheSidebar>
    <div class="container__right">
      <TheNavbar></TheNavbar>
      <TheMain></TheMain>
    </div>
  </div>
</template>
  
<script>
import TheSidebar from '../layout/TheSidebar.vue';
import TheNavbar from '../layout/TheNavbar.vue';
import TheMain from '../layout/TheMain.vue';

export default {
  name: 'DashboardPage',
  components: {
    TheSidebar,
    TheNavbar,
    TheMain,
  }
}
</script>
  
<style>
@import url("../css/main.css");
</style>
  