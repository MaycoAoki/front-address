<template>
  <div id="app" class="container-fluid">
    <div class="container">
      <nav class="navbar" style="background-color: #e3f2fd;">
        <router-link to="/" class="navbar-brand">Endereços</router-link>
        <div class="navbar-nav mr-auto">
<!--          <li class="nav-item">-->
<!--            <router-link to="/students" class="nav-link">Lista</router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/add" class="nav-link">Add</router-link>-->
<!--          </li>-->
        </div>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
