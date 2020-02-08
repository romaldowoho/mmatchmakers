<template>
  <div id="app">
    <Navbar />
    <router-view :key="$route.fullPath" />
    <div id="disqus_thread"></div>
  </div>
</template>

<script>
import Navbar from "./components/navbar";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 30px;
  margin-right: 30px;
}
#disqus_thread {
  margin-top: 50px;
}
</style>
