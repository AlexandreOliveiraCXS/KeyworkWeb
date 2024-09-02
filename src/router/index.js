// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import GenreView from '../views/GenreView.vue';
import StreamingView from '../views/StreamingView.vue';
import MovieView from '../views/MovieView.vue';
import MovieViewDash from '../views/MovieViewDash.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  }, {
    path: '/login',
    name: 'login',
    component: LoginView,
  },

  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/genre',
    name: 'genre',
    component: GenreView,
  },
  {
    path: '/streaming',
    name: 'streaming',
    component: StreamingView,
  },
  {
    path: '/movie',
    name: 'movie',
    component: MovieView,
  },
  {
    path: '/movie/dash',
    name: 'dash',
    component: MovieViewDash,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
