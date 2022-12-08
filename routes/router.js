import { createRouter, createWebHistory } from 'vue-router';
import CategoriesCreate from '../src/components/categories/CategoriesCreate.vue';
import CategoriesList from '../src/components/categories/CategoriesList.vue';
import CategoriesEdit from '../src/components/categories/CategoriesEdit.vue';
import PostCreate from '../src/components/posts/PostCreate.vue';
import PostList from '../src/components/posts/PostList.vue';
import PostEdit from '../src/components/posts/PostEdit.vue';

const routes = [
    { 
        path: '/categories', 
        component: CategoriesList
    },
    {
        path: '/create-categories',
        component: CategoriesCreate
    },
    {
        path: '/edit-categories/:id',
        component: CategoriesEdit
    },
    { 
        path: '/posts', 
        component: PostList
    },
    {
        path: '/create-post',
        component: PostCreate
    },
    {
        path: '/edit-post/:id',
        component: PostEdit
    }

  ];

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;