<template>
  <Card :title="'Home page'">
    <div class="home d-flex align-items-center flex-column">
      <span> Hello, here is </span>
      <div class="logo px-2 font-weight-bold mb-2 cursor-pointer">
        complete.it
      </div>
      <span> - app that you can use to </span>
      <router-link
        :to="{ name: 'AddTask' }"
        class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple text-decoration-none mb-2"
      >
        create new tasks
      </router-link>
      <span> and </span>
      <router-link
        :to="{ name: 'List' }"
        class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple text-decoration-none mb-2"
      >
        manage exisiting ones.
      </router-link>
      <span> Have fun! </span>
    </div>
  </Card>
</template>

<script>
import Card from "../components/shared/Card";
export default {
  name: "Home",
  components: {
    Card,
  },
};
</script>
<style lang="scss" scoped>
.logo {
  background: $pink;
  border-radius: 5px;
  color: $primary;
  text-transform: uppercase;
  border: 2px solid $primary;
}
.home {
  font-size: 20px;
  span {
    margin-bottom: 0.5rem;
  }
}
</style>
