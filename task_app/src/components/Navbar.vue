<template>
  <nav id="nav" class="d-flex align-items-center p-2">
    <ul class="d-flex justify-content-between w-100 pl-0 mb-0">
      <div class="d-flex">
        <li class="logo pl-0 font-weight-bold">
          <router-link to="/" class="px-2 cursor-pointer">
            COMPLETE.IT
          </router-link>
        </li>
      </div>
      <div class="d-flex">
        <li>
          <router-link to="/add" class="px-2 cursor-pointer">
            Add form
          </router-link>
        </li>
        <li>
          <router-link to="/list" class="px-2 cursor-pointer">
            Tasks list
          </router-link>
        </li>
      </div>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
<style lang="scss">
#nav {
  height: 3rem;
  background-color: $primary;
  box-shadow: 0 5px 10px #999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 200;
  ul {
    list-style: none;
    a {
      color: $pink;
      text-decoration: none;
      &.router-link-exact-active {
        font-weight: 600;
        color: white;
      }
    }
    .logo {
      background: $pink;
      border-radius: 5px;

      a {
        color: $primary;
      }
    }
  }
}
</style>
