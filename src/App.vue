<template>
  <navbar-header></navbar-header>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarHeader from '@/components/NavbarHeader';
export default {
  components: {
    NavbarHeader,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.App {
  padding: 20px;
}
</style>
