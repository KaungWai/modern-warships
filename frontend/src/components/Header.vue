<template>
  <div id="header" class="shadow-sm">
    <nav class="navbar navbar-expand-lg navbar-light bg-danger">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-light">MW RANKING</router-link>
        <span class="float-right text-light">{{ version }}</span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props:{
    version : String
  },
  mounted(){
    document.title = "MW RANKING"
  }
};
</script>

<style scoped>
.site-title{
  font-size: 1.5em;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  text-align: center;
}
</style>