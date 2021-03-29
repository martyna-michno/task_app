<template>
  <Card :title="'Home page'">
    <div class="home d-flex align-items-center flex-column">
      Hello, here is
      <div class="logo px-2 font-weight-500">
        complete.it
      </div>
      - app that you can use to
      <router-link
          :to="{ name: 'AddTask' }"
          class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple text-decoration-none"
      >
        create new tasks

      </router-link>
       and
      <router-link
          :to="{ name: 'List' }"
          class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple text-decoration-none"
      >
        manage exisiting ones.

      </router-link>
      Have fun!
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
  border: 1px solid $primary;
}
</style>
