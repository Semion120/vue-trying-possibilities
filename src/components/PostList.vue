<template>
  <div v-if="posts.length > 0">
    <h2>Список постов</h2>
    <transition-group name="user-list">
      <post-item
        :key="post.id"
        v-for="post of posts"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">Cant find posts</h2>
</template>

<script>
import PostItem from '@/components/PostItem.vue';
export default {
  props: { posts: { type: Array, required: true } },
  components: { PostItem },
};
</script>

<style lang="scss" scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.5s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.user-list-move {
  transition: transform 0.4s ease;
}
</style>
