<template>
  <b-modal id="comment-modal" hide-footer hide-header>
    <div>
      <div
        class="alert background-pink d-flex align-items-center shadow justify-content-center flex-column mt-4 text-center"
        role="alert"
      >
        Comments are unremovable, you can read them only in preview mode.
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Comment</div>
        <div class="col-md-9">
          <b-form-textarea
            id="textarea"
            v-model="comment"
            placeholder="Enter task's comment"
            rows="3"
          ></b-form-textarea>
        </div>
      </div>
      <div class="row mt-4 d-flex justify-content-end">
        <b-button @click="hideModal" variant="outline-danger" class="mr-2"
          >Cancel</b-button
        >
        <b-button @click="addComment" variant="success" class="mr-2"
          >Add comment</b-button
        >
      </div>
    </div>
  </b-modal>
</template>
<script>
import Swal from "sweetalert2";

export default {
  name: "CommentModal",
  props: {
    editingTask: {
      type: Object,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("comment-modal");
    },
    addComment() {
      if (this.comment.length < 3) {
        Swal.fire({
          icon: "warning",
          title: "Your comment is too short!",
          text: "It needs to be minimum 3 characters.",
        });
        return;
      }
      this.$store
        .dispatch("addComment", {
          id: this.addCommentTaskId,
          comments: [...this.editingTask.comments, this.comment],
        })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your comment has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
          this.comment = "";
          this.hideModal();
        })
        .catch(() => {
          Swal.fire("Error", "Something went wrong", "error");
        })
        .finally(() => {
          this.$store.commit("CHANGE_LOADING_STATUS", false);
        });
    },
  },
};
</script>
