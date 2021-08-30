<template>
  <div id="header" class="shadow-sm">
    <nav class="navbar navbar-expand-lg bg-danger">
      <router-link to="/" class="site-title text-light">MW RANKING</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  mounted(){
    document.title = "MW RANKING"
  }
};
</script>

<style scoped>
.site-title{
  font-size: 1.5em;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;
}
</style>