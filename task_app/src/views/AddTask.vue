<template>
  <div>
    <FormTask :mode="MODES.ADD" />
  </div>
</template>
<script>
import FormTask from "@/components/FormTask";
import { MODES } from "@/consts";

export default {
  name: "AddTask",
  components: {
    FormTask,
  },
  created() {
    this.MODES = MODES;
  },
};
</script>
