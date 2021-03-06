<template>
  <div>
    <Loader v-if="loading" />
    <template v-else>
      <Card :title="title">
        <form class="mx-2" @submit.prevent="save">
          <div class="row">
            <div class="col-md-3 d-flex font-weight-bold">Title*</div>
            <div class="col-md-9">
              <b-form-input
                v-model="form.title"
                placeholder="Enter task's title"
              ></b-form-input>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Description*</div>
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
            <div class="col-md-3 d-flex font-weight-bold">Performer*</div>
            <div class="col-md-9">
              <b-form-input
                v-model="form.performer"
                placeholder="Enter task performer"
              ></b-form-input>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Deadline*</div>
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
            <div class="col-md-3 d-flex font-weight-bold">Category</div>
            <div class="col-md-9">
              <b-form-select
                v-model="form.category"
                :options="SPORT_CATEGORIES"
                :plain="true"
              ></b-form-select>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Tags</div>
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
            <div class="col-md-3 d-flex font-weight-bold">
              Level of difficulty
            </div>
            <div class="col-md-9">
              <b-form-rating
                id="rating-inline"
                variant="primary"
                inline
                v-model="form.levelOfDifficulty"
              ></b-form-rating>
            </div>
          </div>
          <div v-if="showAddFile" class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Photos upload</div>
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
                class="alert background-pink d-flex align-items-center justify-content-center shadow flex-column mt-4 w-100 text-center"
                role="alert"
              >
                Operations on photos will be permanently saved after pressing
                the "{{ buttonTitle }}" button.
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-3 d-flex font-weight-bold">Pictures</div>
              <div class="col-md-9 d-flex">
                <VuePerfectScrollbar class="d-flex scroll-area">
                  <div
                    class="image-container m-2"
                    v-for="file in form.files"
                    :key="`${file}_${Math.floor(Math.random() * 100000)}`"
                  >
                    <span
                      v-if="!isAddMode"
                      class="delete-button d-flex align-items-center justify-content-center cursor-pointer mb-05"
                    >
                      <b-icon
                        icon="x"
                        variant="danger"
                        @click="deleteFile(file)"
                      >
                      </b-icon>
                    </span>
                    <img :src="file" class="img-miniature" />
                  </div>
                </VuePerfectScrollbar>
              </div>
            </div>
          </template>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Training fasting</div>
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
            <div class="col-md-3 d-flex font-weight-bold">Status</div>
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
            class="alert background-pink d-flex align-items-center justify-content-center shadow flex-column mt-4"
            role="alert"
          >
            The created task is automatically assigned the "new" status.
            <p class="m-0">
              If you want to change the status, click on the task edit icon on
              the task list.
            </p>
          </div>
          <div
            class="row mx-0 mt-2 d-flex justify-content-end font-weight-bold"
          >
            *Required fields
          </div>
          <div class="row mt-4 d-flex justify-content-end mx-0">
            <b-button
              v-if="isAddMode"
              variant="outline-danger"
              class="mr-2"
              @click="resetForm"
              >Reset form</b-button
            >
            <b-button variant="success" type="submit">{{
              buttonTitle
            }}</b-button>
          </div>
        </form>
      </Card>
    </template>
  </div>
</template>
<script>
import Card from "../components/shared/Card";
import Loader from "../components/shared/Loader";
import { SPORT_CATEGORIES, MODES, STATUSES } from "@/consts";
import Swal from "sweetalert2";
import { mapState } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import router from "@/router";

export default {
  name: "FormTask",
  components: {
    Card,
    VuePerfectScrollbar,
    Loader,
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
    ...mapState(["tasks", "task", "loading"]),
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
      this.$store
        .dispatch("getTaskById", this.id)
        .then(() => {
          this.form = this.task;
        })
        .catch(() => {
          Swal.fire("Error", "Something went wrong", "error");
          router.push({
            name: "List",
          });
        })
        .finally(() => {
          this.$store.commit("CHANGE_LOADING_STATUS", false);
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
    addTask() {
      this.$store
        .dispatch("addTask", this.form)
        .then(() => {
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
        })
        .catch(() => {
          Swal.fire("Error", "Something went wrong", "error");
        })
        .finally(() => {
          this.$store.commit("CHANGE_LOADING_STATUS", false);
        });
    },
    editTask() {
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
        })
        .catch(() => {
          Swal.fire("Error", "Something went wrong", "error");
        })
        .finally(() => {
          this.$store.commit("CHANGE_LOADING_STATUS", false);
        });
    },
    save() {
      if (
        !this.form.title ||
        !this.form.text ||
        !this.form.deadline ||
        !this.form.performer
      ) {
        Swal.fire({
          icon: "warning",
          title: "Fill in the required fields!",
          text: "They are marked with an asterisk",
        });
        return;
      }
      if (this.isAddMode) {
        this.addTask();
      } else {
        this.editTask();
      }
    },
    deleteFile(file) {
      this.form.files = this.form.files.filter((el) => el !== file);
    },
  },
};
</script>
