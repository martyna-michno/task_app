<template>
  <div class="app-card">
    <div v-if="title" class="app-card-title p-2 font-weight-500">
      {{ title }}
    </div>
    <div class="app-card-body p-2">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss">
.app-card {
  background: white;
  text-align: initial;
  -webkit-box-shadow: 10px 5px 25px -8px rgba(128, 128, 128, 1);
  -moz-box-shadow: 10px 5px 25px -8px rgba(128, 128, 128, 1);
  box-shadow: 10px 5px 25px -8px rgba(128, 128, 128, 1);
}

.app-card-title {
  font-size: 20px;
  border-left: 3px solid $primary;
}
</style>
