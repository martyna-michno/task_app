<template>
  <div class="app-card shadow">
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
}

.app-card-title {
  font-size: 20px;
  border-left: 3px solid $primary;
}
</style>
