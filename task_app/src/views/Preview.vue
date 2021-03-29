<template>
  <div>
    <template v-if="loading">
      <Loader />
    </template>
    <template v-else>
      <router-link
        v-if="taskWithCategoryAndStatusValues.status.value === 0"
        :to="{ name: 'EditTask', params: { id: this.id } }"
        class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple mb-2 text-decoration-none"
      >
        Switch to the edit mode
        <span class="ml-2">
          <b-icon icon="pencil"></b-icon>
        </span>
      </router-link>
      <Card>
        <div id="preview" class="p-4">
          <div class="row">
            <div class="col-md-3 d-flex font-weight-bold">Title</div>
            <div class="col-md-9 d-flex">
              {{ taskWithCategoryAndStatusValues.title }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Description</div>
            <div class="col-md-9 d-flex">
              {{ taskWithCategoryAndStatusValues.text }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Perfomer</div>
            <div class="col-md-9 d-flex">
              {{ taskWithCategoryAndStatusValues.performer }}
            </div>
          </div>
          <div
            v-if="taskWithCategoryAndStatusValues.category.value !== 0"
            class="row mt-4"
          >
            <div class="col-md-3 d-flex font-weight-bold">Category</div>
            <div class="col-md-9 d-flex">
              {{ taskWithCategoryAndStatusValues.category.text }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Status</div>
            <div class="col-md-9 d-flex">
              {{ taskWithCategoryAndStatusValues.status.text }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Deadline</div>
            <div class="col-md-9 d-flex">
              {{ taskWithCategoryAndStatusValues.deadline }}
            </div>
          </div>
          <div
            v-if="taskWithCategoryAndStatusValues.tags.length"
            class="row mt-4"
          >
            <div class="col-md-3 d-flex font-weight-bold">Tags</div>
            <div class="col-md-9 d-flex">
              <div
                v-for="tag in taskWithCategoryAndStatusValues.tags"
                :key="`${tag}_${Math.floor(Math.random() * 100000)}`"
                class="px-2 py-1 font-weight-bold tag-pill mr-2"
              >
                {{ tag }}
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">
              Level of difficulty
            </div>
            <div class="col-md-9 d-flex">
              <b-form-rating
                id="rating-inline"
                variant="primary"
                inline
                disabled
                v-model="taskWithCategoryAndStatusValues.levelOfDifficulty"
              ></b-form-rating>
            </div>
          </div>
          <template v-if="taskWithCategoryAndStatusValues.files.length">
            <div class="row mt-4">
              <div
                class="alert background-pink d-flex align-items-center justify-content-center flex-column w-100"
                role="alert"
              >
                Click on the picture to download it.
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-3 d-flex font-weight-bold">Files</div>
              <div class="col-md-9 d-flex">
                <VuePerfectScrollbar class="scroll-area d-flex" v-once>
                  <div
                    class="image-container m-2"
                    v-for="file in taskWithCategoryAndStatusValues.files"
                    :key="`${file}_${Math.floor(Math.random() * 100000)}`"
                  >
                    <a :href="file" :download="'image.jpg'">
                      <img :src="file" class="img-miniature" />
                    </a>
                  </div>
                </VuePerfectScrollbar>
              </div>
            </div>
          </template>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-bold">Training fasting</div>
            <div class="col-md-9 d-flex">
              Training can
              {{
                taskWithCategoryAndStatusValues.canFasting === "false"
                  ? "not"
                  : ""
              }}
              be done on an empty stomach.
            </div>
          </div>
          <div
            class="row mt-4"
            v-if="taskWithCategoryAndStatusValues.comments.length"
          >
            <div class="col-md-3 d-flex font-weight-bold">Comments</div>
            <div class="col-md-9 d-flex">
              <ul class="list-style-none w-100">
                <li
                  v-for="comment in taskWithCategoryAndStatusValues.comments"
                  :key="`${comment}_${Math.floor(Math.random() * 100000)}`"
                  class="mb-2 p-2 background-pink list-item"
                >
                  {{ comment }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </template>
  </div>
</template>
<script>
import Card from "../components/shared/Card";
import Loader from "../components/shared/Loader";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Preview",
  components: {
    Card,
    VuePerfectScrollbar,
    Loader,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["taskWithCategoryAndStatusValues"]),
  },
  created() {
    this.$store.dispatch("getTaskById", this.$route.params.id);
  },
};
</script>
<style lang="scss" scoped>
.list-item {
  border: 1px solid $primary;
  box-shadow: 5px 5px 15px -5px grey;
}
.tag-pill {
  background: $primary;
  border-radius: 15px;
  color: $pink;
}
</style>
