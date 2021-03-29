<template>
  <div>
    <template v-if="loading"> Loading... </template>
    <template v-else>
      <router-link
        v-if="taskWithCategoryAndStatusValues.status.value === 0"
        :to="{ name: 'EditTask', params: { id: this.$route.params.id } }"
        class="d-flex justify-content-end cursor-pointer font-weight-bold color-purple mb-2 text-decoration-none"
      >
        Switch to edit mode
        <span class="ml-2">
          <b-icon icon="pencil"></b-icon>
        </span>
      </router-link>
      <Card>
        <div id="preview" class="p-4">
          <div class="row">
            <div class="col-md-3 d-flex font-weight-500">Title</div>
            <div class="col-md-9 d-flex font-weight-500">
              {{ taskWithCategoryAndStatusValues.title }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">Description</div>
            <div class="col-md-9 d-flex font-weight-500">
              {{ taskWithCategoryAndStatusValues.text }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">Perfomer</div>
            <div class="col-md-9 d-flex font-weight-500">
              {{ taskWithCategoryAndStatusValues.performer }}
            </div>
          </div>
          <div v-if="taskWithCategoryAndStatusValues.category.value !== 0" class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">Category</div>
            <div class="col-md-9 d-flex font-weight-500">
              {{ taskWithCategoryAndStatusValues.category.text }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">Status</div>
            <div class="col-md-9 d-flex font-weight-500">
              {{ taskWithCategoryAndStatusValues.status.text }}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">Deadline</div>
            <div class="col-md-9 d-flex font-weight-500">
              {{ taskWithCategoryAndStatusValues.deadline }}
            </div>
          </div>
          <div v-if="taskWithCategoryAndStatusValues.tags.length" class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">Tags</div>
            <div class="col-md-9 d-flex font-weight-500">
              <div
                v-for="(tag, index) in taskWithCategoryAndStatusValues.tags"
                :key="index"
                class="px-2 py-1 font-weight-500 tag-pill mr-2"
              >
                {{ tag }}
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-3 d-flex font-weight-500">
              Level of difficulty
            </div>
            <div class="col-md-9 d-flex font-weight-500">
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
            <div class="col-md-3 d-flex font-weight-500">Files</div>
            <div class="col-md-9 d-flex">
              <VuePerfectScrollbar class="scroll-area d-flex" v-once>
                <div
                  class="image-container m-2"
                  v-for="file in taskWithCategoryAndStatusValues.files"
                  :key="`${file}_${Math.random() * 99999}`"
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
            <div class="col-md-3 d-flex font-weight-500">Training fasting</div>
            <div class="col-md-9 d-flex font-weight-500">
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
            <div class="col-md-3 d-flex font-weight-500">Comments</div>
            <div class="col-md-9 d-flex">
              <ul class="list-style-none w-100">
                <li
                  v-for="(
                    comment, index
                  ) in taskWithCategoryAndStatusValues.comments"
                  :key="index"
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Preview",
  components: {
    Card,
    VuePerfectScrollbar,
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
