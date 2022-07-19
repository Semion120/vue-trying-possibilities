<template>
  <div>
    <form @submit.prevent>
      <h4>New post</h4>
      <my-input
        v-focus
        v-model="post.title"
        placeholder="Some title"
        type="text"
      />
      <my-input
        v-model="post.body"
        placeholder="Some description"
        type="text"
      />

      <my-button class="btn_form" @click="createPost">Add post</my-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: '',
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        id: '',
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn_form {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
