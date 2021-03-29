<template>
  <div class="d-flex justify-content-center">
    <DoubleBounce :size="'60px'" background="#333d79ff" />
  </div>
</template>
<script>
import { DoubleBounce } from "vue-loading-spinner";

export default {
  components: {
    DoubleBounce,
  },
  name: "Loader",
};
</script>
