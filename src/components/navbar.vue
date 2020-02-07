<template>
  <div>
    <div class="navbar">
      <div class="title">
        <h2>
          <router-link class="router-link" to="/">MMATCHMAKERS</router-link>
        </h2>
      </div>
      <div class="link">
        <h3>
          <router-link class="router-link" to="/">Home</router-link>
        </h3>
      </div>
      <div class="link">
        <h3>
          <router-link class="router-link" to="/votes">Votes</router-link>
        </h3>
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
.router-link {
  color: white;
}
.title {
  float: left;
}
.title:hover {
  cursor: pointer;
}
@media (max-width: 415px) {
  .navbar {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
  }
  .title {
    width: 100%;
  }
  .link {
    width: 40%;
    padding-left: 45px;
  }
}
</style>
