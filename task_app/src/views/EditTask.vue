<template>
  <div>
    <div
      class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple mb-2 text-decoration-none"
    >
      Switch to preview mode
      <span class="ml-2">
        <b-icon icon="search"></b-icon>
      </span>
    </div>
    <FormTask mode="edit" :id="id" />
  </div>
</template>
<script>
import FormTask from "@/components/FormTask";
import { mapState } from "vuex";

export default {
  name: "EditTask",
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    ...mapState(["tasks"]),
  },
  components: {
    FormTask,
  },
};
</script>
