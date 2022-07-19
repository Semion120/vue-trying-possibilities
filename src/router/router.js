import Main from '@/pages/MainPage';
import PostPage from '@/pages/PostPage';
import About from '@/pages/AboutApp';
import PostIdPage from '@/pages/PostIdPage';
import PostsPageWithStore from '@/pages/PostsPageWithStore';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/store',
    component: PostsPageWithStore,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
