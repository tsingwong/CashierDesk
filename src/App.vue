<template>
  <div id="app">
    <i class="icon iconfont icon-huiyuan"></i>
    <i class="icon iconfont icon-shezhi"></i>
    <i class="icon iconfont icon-dianpu"></i>
    <i class="icon iconfont icon-shumashouji"></i>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
