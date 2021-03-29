<template>
  <div>
    <router-link
      :to="{ name: 'Preview', params: { id: this.$route.params.id } }"
      class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple mb-2 text-decoration-none"
    >
      Switch to the preview mode
      <span class="ml-2">
        <b-icon icon="search"></b-icon>
      </span>
    </router-link>
    <FormTask :mode="MODES.EDIT" :id="id" />
  </div>
</template>
<script>
import FormTask from "@/components/FormTask";
import { MODES } from "@/consts";

export default {
  name: "EditTask",
  components: {
    FormTask,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  created() {
    this.MODES = MODES;
  },
};
</script>
