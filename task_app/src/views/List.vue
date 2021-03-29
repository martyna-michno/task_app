<template>
  <div>
    <Loader v-if="loading" />
    <template v-else>
      <CommentModal :id="addCommentTaskId" :editing-task="editingTask" />
      <Card :title="'The List of added tasks'">
        <div
          class="alert shadow background-pink d-flex align-items-center justify-content-center flex-column mx-2"
          role="alert"
        >
          You can edit or delete only tasks with "new" status.
        </div>
        <DataTable
          :value="tasks"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20]"
          class="p-datatable-striped p-datatable-responsive-demo px-2"
          show-gridlines
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        >
          <Column header="Title" field="title">
            <template #body="slotProps">
              <span class="p-column-title">Title</span>
              {{ slotProps.data.title }}
            </template>
          </Column>
          <Column header="Performer" field="performer">
            <template #body="slotProps">
              <span class="p-column-title">Performer</span>
              {{ slotProps.data.performer }}
            </template>
          </Column>
          <Column header="Deadline" field="deadline">
            <template #body="slotProps">
              <span class="p-column-title">Deadline</span>
              {{ slotProps.data.deadline }}
            </template>
          </Column>
          <Column header="Edit" field="edit">
            <template #body="slotProps">
              <div class="p-column-title">Edit</div>
              <router-link
                v-if="slotProps.data.status === 0"
                :to="{ name: 'EditTask', params: { id: slotProps.data.id } }"
                class="cursor-pointer"
              >
                <b-icon icon="pencil" variant="success"> </b-icon>
              </router-link>
            </template>
          </Column>
          <Column header="Preview" field="preview">
            <template #body="slotProps">
              <div class="p-column-title">Preview</div>
              <router-link
                :to="{ name: 'Preview', params: { id: slotProps.data.id } }"
                class="cursor-pointer"
              >
                <b-icon icon="search" variant="success"> </b-icon>
              </router-link>
            </template>
          </Column>
          <Column header="Add comment" field="addComment">
            <template #body="slotProps">
              <div class="p-column-title">Add comment</div>
              <span
                class="cursor-pointer"
                @click="openModalComment(slotProps.data.id)"
              >
                <b-icon icon="plus-square-fill" variant="success"> </b-icon>
              </span>
            </template>
          </Column>
          <Column header="Delete" field="deleteTask">
            <template #body="slotProps">
              <div class="p-column-title">Delete</div>
              <span
                class="cursor-pointer"
                v-if="slotProps.data.status === 0"
                @click="deleteTask(slotProps.data.id)"
              >
                <b-icon icon="x-square-fill" variant="danger"> </b-icon>
              </span>
            </template>
          </Column>
        </DataTable>
      </Card>
    </template>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "../components/shared/Card";
import Loader from "../components/shared/Loader";
import CommentModal from "@/components/CommentModal";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  name: "List",
  components: {
    DataTable,
    Column,
    Card,
    Loader,
    CommentModal,
  },
  data() {
    return {
      addCommentTaskId: 0,
    };
  },
  mounted() {
    this.getTasks();
  },
  computed: {
    ...mapState(["tasks", "loading"]),
    editingTask() {
      return this.tasks.find((el) => el.id === this.addCommentTaskId) ?? {};
    },
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasks");
    },
    deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#333d79ff",
        cancelButtonColor: "#990011FF",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteTask", id);
        }
      });
    },
    openModalComment(id) {
      this.addCommentTaskId = id;
      this.$bvModal.show("comment-modal");
    },
  },
};
</script>
<style lang="scss">
.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 500px) {
  .p-datatable {
    &.p-datatable-responsive-demo {
      .p-datatable-thead > tr > th,
      .p-datatable-tfoot > tr > td {
        display: none !important;
      }

      .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        width: 100%;
        float: left;
        clear: left;
        border: 0 none;

        .p-column-title {
          padding: 0.4rem;
          min-width: 30%;
          display: inline-block;
          margin: -0.4em 1em -0.4em -0.4rem;
          font-weight: bold;
        }

        &:last-child {
          border-bottom: 1px solid var(--surface-d);
        }
      }
    }
  }
}
</style>
