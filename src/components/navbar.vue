<template>
  <div>
    <div class="navbar">
      <div class="link">
        <h3><router-link to="/"> Home </router-link></h3>
      </div>
      <div class="link">
        <h3><router-link to="/votes"> Votes </router-link></h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 40px;
  vertical-align: center;
  line-height: 40px;
}

.link {
  float: right;
  margin-right: 20px;
}
</style>
