<template>
  <div>
    <h1>Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Searching..." />
    <div class="app__btns">
      <my-button style="margin-top: 10px" @click="showDialog"
        >Create new Post</my-button
      >
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      v-if="!isPostsLoading"
      :posts="searchInSoretdPosts"
      @remove="removePost"
    />
    <h2 v-else>Loading...</h2>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div
        class="page_item"
        :key="pageNumber"
        v-for="pageNumber of totalPages"
        :class="{ current_page: pageNumber === page }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
import MyInput from '@/components/UI/MyInput.vue';
export default {
  components: { PostForm, PostList, MyInput },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 0,
      limit: 10,
      totalPages: 10,
      sortOptions: [
        { value: 'title', name: 'To title' },
        { value: 'body', name: 'To body' },
      ],
    };
  },
  methods: {
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          { params: { _page: this.page, _limit: this.limit } }
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Error with server');
      }
    },
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    searchInSoretdPosts() {
      return this.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery)
      );
    },
  },
  watch: {
    // page() {
    //   this.loadMorePosts();
    // },
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
