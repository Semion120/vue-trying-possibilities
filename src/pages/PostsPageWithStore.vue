<template>
  <div>
    <h1>Posts page</h1>
    <my-input
      v-focus
      :modelValue="searchQuery"
      @update:modelValue="setSearch"
      placeholder="Searching..."
    />
    <div class="app__btns">
      <my-button style="margin-top: 10px" @click="showDialog"
        >Create new Post</my-button
      >
      <my-select
        :modelValue="selectedSort"
        @update:modelValue="setSelectedSort"
        :options="sortOptions"
      ></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      v-if="!isPostsLoading"
      :posts="searchInSoretedPosts"
      @remove="removePost"
    />
    <h2 v-else>Loading...</h2>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyInput from '@/components/UI/MyInput.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  components: { PostForm, PostList, MyInput },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearch: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({ loadMorePosts: 'post/loadMorePosts' }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => {
        return p.id !== post.id;
      });
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchInSoretedPosts: 'post/searchInSoretedPosts',
    }),
  },
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page_item {
  border: 1px solid black;
  padding: 10px;
}
.current_page {
  border: 2px solid green;
}
.observer {
  height: 30px;
  background-color: green;
}
</style>
