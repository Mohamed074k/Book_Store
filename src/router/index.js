// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // Public Routes
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('@/views/Books.vue'),
  },
  {
    path: '/books/:id',
    name: 'BookDetail',
    component: () => import('@/views/BookDetail.vue'),
    props: true,
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () => import('@/views/Authors.vue'),
  },
  {
    path: '/authors/:id',
    name: 'AuthorDetail',
    component: () => import('@/views/AuthorDetail.vue'),
    props: true,
  },

  // Admin Routes (protected)
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isAuthenticated) next()
      else next('/admin/login') // optional login page later
    },
    children: [
      {
        path: '',
        redirect: 'books',
      },
      {
        path: 'books',
        name: 'AdminBooks',
        component: () => import('@/views/admin/BooksCRUD.vue'),
      },
      {
        path: 'books/new',
        name: 'AdminBookCreate',
        component: () => import('@/views/admin/BookForm.vue'),
      },
      {
        path: 'books/:id/edit',
        name: 'AdminBookEdit',
        component: () => import('@/views/admin/BookForm.vue'),
        props: true,
      },
      {
        path: 'authors',
        name: 'AdminAuthors',
        component: () => import('@/views/admin/AuthorsCRUD.vue'),
      },
      {
        path: 'authors/new',
        name: 'AdminAuthorCreate',
        component: () => import('@/views/admin/AuthorForm.vue'),
      },
      {
        path: 'authors/:id/edit',
        name: 'AdminAuthorEdit',
        component: () => import('@/views/admin/AuthorForm.vue'),
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global guard (optional redirect for protected routes)
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/about', '/books', '/authors', '/books/:id', '/authors/:id']
  const isPublic = publicPages.some(p => 
    to.path === p || to.path.match(new RegExp(`^${p.replace(/:\w+/g, '[^/]+')}$`))
  )
  const auth = useAuthStore()

  if (!isPublic && !auth.isAuthenticated) {
    next('/admin/login') // You can add a login page later
  } else {
    next()
  }
})

export default router