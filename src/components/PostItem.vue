<template>
  <div class="post">
    <div>
      <div>
        <div>{{ post.id }}</div>
        <strong>{{ post.title }}</strong>
      </div>
      <div>{{ post.body }}</div>
    </div>
    <div class="post_btns">
      <my-button @click="$emit('remove', post)">Del</my-button>
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="css" scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>
