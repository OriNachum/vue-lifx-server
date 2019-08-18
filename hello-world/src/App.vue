<template>
  <div id="app" class="app">
    <div id="nav" class="navbar">
      <router-link class="navbar-link" to="/">Main Page</router-link>
      <span class="navbar-space"></span>
      <router-link class="navbar-link" to="/schedule">Schedule Page</router-link>
      <!--<router-link to="/bulb/Television">BulbPage</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app {
  .navbar{
    display: inline-flex;

    &-space {
      min-width: 1em;
    }
  }
}
</style>
