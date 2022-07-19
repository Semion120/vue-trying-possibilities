import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    searchInSoretedPosts(state, getters) {
      return getters.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(state.searchQuery)
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async loadMorePosts({ state, commit }) {
      try {
        commit('setLoading', true);
        state.page += 1;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          { params: { _page: state.page, _limit: state.limit } }
        );
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        alert('Error with server');
      } finally {
        commit('setLoading', false);
      }
    },
  },
  namespaced: true,
};
