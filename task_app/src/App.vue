<template>
  <div id="app">
    <Navbar />
    <div class="p-3" style="margin-top: 3rem">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #f0f0f0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
