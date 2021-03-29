<template>
  <Card :title="title">
    <form class="add-form" @submit.prevent="save">
      <div class="row">
        <div class="col-md-3 d-flex font-weight-500">Title*</div>
        <div class="col-md-9">
          <b-form-input
            v-model="form.title"
            placeholder="Enter task's title"
          ></b-form-input>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Description*</div>
        <div class="col-md-9">
          <b-form-textarea
            id="textarea"
            v-model="form.text"
            placeholder="Enter task's content..."
            rows="3"
          ></b-form-textarea>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Performer*</div>
        <div class="col-md-9">
          <b-form-input
            v-model="form.performer"
            placeholder="Enter task performer"
          ></b-form-input>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Deadline*</div>
        <div class="col-md-9">
          <b-form-datepicker
            v-model="form.deadline"
            :min="min"
            locale="en"
            nav-button-variant="primary"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Category</div>
        <div class="col-md-9">
          <b-form-select
            v-model="form.category"
            :options="SPORT_CATEGORIES"
            :plain="true"
          ></b-form-select>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Tags</div>
        <div class="col-md-9">
          <b-form-tags
            input-id="tags-pills"
            v-model="form.tags"
            tag-variant="primary"
            tag-pills
            separator=" "
            :limit="4"
            placeholder="Enter new tags separated by space"
          ></b-form-tags>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Level of difficulty</div>
        <div class="col-md-9">
          <b-form-rating
            id="rating-inline"
            variant="primary"
            inline
            v-model="form.levelOfDifficulty"
          ></b-form-rating>
        </div>
      </div>
      <div class="row mt-4" v-if="showAddFile">
        <div class="col-md-3 d-flex font-weight-500">Files</div>
        <div class="col-md-9">
          <b-form-file
            v-model="files"
            multiple
            accept="image/jpeg, image/png, image/gif"
          ></b-form-file>
        </div>
      </div>
      <template v-if="form.files.length">
        <div class="row mt-4 mx-0 w-100">
          <div
            class="alert background-pink d-flex align-items-center justify-content-center flex-column mt-4 w-100"
            role="alert"
          >
            Operations on photos will be permanently saved after pressing the
            "{{ buttonTitle }}" button.
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-3 d-flex font-weight-500">Pictures</div>
          <div class="col-md-9 d-flex">
            <VuePerfectScrollbar class="d-flex scroll-area">
              <div
                class="image-container m-2"
                v-for="file in form.files"
                :key="`${file}_${Math.random() * 99999}`"
              >
                <span
                  v-if="!isAddMode"
                  class="delete-button d-flex align-items-center justify-content-center cursor-pointer mb-05"
                >
                  <b-icon icon="x" variant="danger" @click="deleteFile(file)">
                  </b-icon>
                </span>
                <img :src="file" class="img-miniature" />
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </template>
      <div class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Training fasting</div>
        <div class="col-md-9">
          <b-form-checkbox
            id="checkbox"
            v-model="form.canFasting"
            name="checkbox"
            :value="'true'"
            :unchecked-value="'false'"
          >
            Training can be done on an empty stomach.
          </b-form-checkbox>
        </div>
      </div>
      <div v-if="!isAddMode" class="row mt-4">
        <div class="col-md-3 d-flex font-weight-500">Status</div>
        <div class="col-md-9">
          <b-form-select
            v-model="form.status"
            :options="STATUSES"
            :plain="true"
          ></b-form-select>
        </div>
      </div>
      <div
        v-if="isAddMode"
        class="alert background-pink d-flex align-items-center justify-content-center flex-column mt-4"
        role="alert"
      >
        The created task is automatically assigned the "new" status.
        <p class="m-0">
          If you want to change the status, click on the task edit icon on the
          task list.
        </p>
      </div>
      <div class="row m2-4 mx-0">*Required fields</div>
      <div class="row mt-4 d-flex justify-content-end mx-0">
        <b-button
          v-if="isAddMode"
          variant="outline-danger"
          class="mr-2"
          @click="resetForm"
          >Reset form</b-button
        >
        <b-button variant="success" type="submit">{{ buttonTitle }}</b-button>
      </div>
    </form>
  </Card>
</template>
<script>
import Card from "../components/shared/Card";
import { SPORT_CATEGORIES, MODES, STATUSES } from "@/consts";
import Swal from "sweetalert2";
import { mapState } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "FormTask",
  components: {
    Card,
    VuePerfectScrollbar,
  },
  props: {
    id: {
      type: [Number, String],
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      min: today,
      form: null,
      files: [],
    };
  },
  watch: {
    files(newVal) {
      this.form.files = [];
      newVal.forEach((el) => {
        this.getBase64(el).then((data) => this.form.files.push(data));
      });
    },
  },
  computed: {
    ...mapState(["tasks", "task"]),
    isAddMode() {
      return this.mode === MODES.ADD;
    },
    title() {
      return this.isAddMode ? "Fill the form and add new task" : "Editing task";
    },
    buttonTitle() {
      return this.isAddMode ? "Add task" : "Save changes";
    },
    showAddFile() {
      return this.isAddMode ? true : !this.form.files.length;
    },
    editingTask() {
      return this.$store.getters.getTaskById;
    },
  },
  created() {
    this.createFreshFormData();
    if (!this.isAddMode) {
      this.$store.dispatch("getTaskById", this.id).then(() => {
        this.form = this.task;
      });
    }
    this.SPORT_CATEGORIES = SPORT_CATEGORIES;
    this.STATUSES = STATUSES;
  },
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    createFreshFormData() {
      this.form = {
        title: "",
        text: "",
        performer: "",
        deadline: "",
        tags: [],
        category: 0,
        files: [],
        canFasting: false,
        levelOfDifficulty: 0,
        comments: [],
        status: 0,
      };
    },
    resetForm() {
      this.createFreshFormData();
    },
    save() {
      if (this.isAddMode) {
        this.$store.dispatch("addTask", this.form).then(() => {
          this.createFreshFormData();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task has been saved",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push({
              name: "List",
            });
          });
        });
      } else {
        this.$store
          .dispatch("editTask", {
            id: this.id,
            task: this.form,
          })
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your edition has been saved",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.$router.push({
                name: "List",
              });
            });
          });
      }
    },
    deleteFile(file) {
      this.form.files = this.form.files.filter((el) => el !== file);
    },
  },
};
</script>
<style lang="scss">
@media (min-width: 600px) {
  .add-form {
    margin: 0 10vw 0 10vw;
  }
}
</style>
