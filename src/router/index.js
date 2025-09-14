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
    props: route => ({ id: route.params.id })
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
    props: route => ({ id: route.params.id })
  },

  // Admin Login Route
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/Login.vue'),
  },

  // Admin Routes (protected)
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        next()
      } else {
        next('/admin/login')
      }
    },
    children: [
      {
        path: '',
        redirect: { name: 'AdminBooks' }
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
        props: route => ({ id: route.params.id })
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
        props: route => ({ id: route.params.id })
      },
    ]
  },

  // 404 Route (Catch-all)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // If trying to access any admin route (except login), require auth
  if (to.path.startsWith('/admin') && to.name !== 'AdminLogin') {
    if (!auth.isAuthenticated) {
      next('/admin/login')
      return
    }
  }

  // If authenticated and trying to access /admin/login, redirect to admin dashboard
  if (to.name === 'AdminLogin' && auth.isAuthenticated) {
    next('/admin')
    return
  }

  next()
})

export default router