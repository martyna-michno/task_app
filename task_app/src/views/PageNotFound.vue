<template>
  <Card>
    <div
      class="d-flex align-items-center justify-content-center w-100 not-found"
    >
      page not found
    </div>
  </Card>
</template>

<script>
import Card from "../components/shared/Card";
export default {
  name: "PageNotFound",
  components: {
    Card,
  },
};
</script>
<style lang="scss" scoped>
.not-found {
  font-size: 20px;
  color: $danger;
  text-transform: uppercase;
}
</style>
