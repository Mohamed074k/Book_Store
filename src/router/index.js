// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Public Layout
const PublicLayout = () => import('@/components/layout/PublicLayout.vue')

// Admin Layout
const AdminLayout = () => import('@/components/layout/AdminLayout.vue')

// Public Pages
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const Books = () => import('@/views/Books.vue')
const BookDetail = () => import('@/views/BookDetail.vue')
const Authors = () => import('@/views/Authors.vue')
const AuthorDetail = () => import('@/views/AuthorDetail.vue')

// Admin Pages
const AdminLogin = () => import('@/views/admin/Login.vue')
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')
const BooksCRUD = () => import('@/views/admin/BooksCRUD.vue')
const BookForm = () => import('@/views/admin/BookForm.vue')
const AuthorsCRUD = () => import('@/views/admin/AuthorsCRUD.vue')
const AuthorForm = () => import('@/views/admin/AuthorForm.vue')

// Route definitions
const routes = [
  // Public routes with public layout
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Home - Library Management'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          title: 'About - Library Management'
        }
      },
      {
        path: 'books',
        name: 'Books',
        component: Books,
        meta: {
          title: 'Books - Library Management'
        }
      },
      {
        path: 'books/:id',
        name: 'BookDetail',
        component: BookDetail,
        props: true,
        meta: {
          title: 'Book Details - Library Management'
        }
      },
      {
        path: 'authors',
        name: 'Authors',
        component: Authors,
        meta: {
          title: 'Authors - Library Management'
        }
      },
      {
        path: 'authors/:id',
        name: 'AuthorDetail',
        component: AuthorDetail,
        props: true,
        meta: {
          title: 'Author Profile - Library Management'
        }
      }
    ]
  },

  // Admin login (standalone, no layout)
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      title: 'Admin Login - Library Management',
      public: true,
      hideForAuth: true // Hide if already authenticated
    }
  },

  // Admin routes with admin layout
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      roles: ['admin']
    },
    children: [
      // Dashboard
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: {
          title: 'Dashboard - Admin Panel',
          breadcrumb: 'Dashboard'
        }
      },
      
      // Books Management Routes
      {
        path: 'books',
        name: 'AdminBooks',
        component: BooksCRUD,
        meta: {
          title: 'Manage Books - Admin Panel',
          breadcrumb: 'Books'
        }
      },
      {
        path: 'books/new',
        name: 'AdminBookCreate',
        component: BookForm,
        meta: {
          title: 'Add Book - Admin Panel',
          breadcrumb: 'Add Book'
        }
      },
      {
        path: 'books/:id/edit',
        name: 'AdminBookEdit',
        component: BookForm,
        props: true,
        meta: {
          title: 'Edit Book - Admin Panel',
          breadcrumb: 'Edit Book'
        }
      },
      
      // Authors Management Routes
      {
        path: 'authors',
        name: 'AdminAuthors',
        component: AuthorsCRUD,
        meta: {
          title: 'Manage Authors - Admin Panel',
          breadcrumb: 'Authors'
        }
      },
      {
        path: 'authors/new',
        name: 'AdminAuthorCreate',
        component: AuthorForm,
        meta: {
          title: 'Add Author - Admin Panel',
          breadcrumb: 'Add Author'
        }
      },
      {
        path: 'authors/:id/edit',
        name: 'AdminAuthorEdit',
        component: AuthorForm,
        props: true,
        meta: {
          title: 'Edit Author - Admin Panel',
          breadcrumb: 'Edit Author'
        }
      }
    ]
  },

  // Catch all route - 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - Library Management'
    }
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  try {
    // Initialize auth store
    const auth = useAuthStore()
    
    // Check authentication status
    await auth.checkAuth()
    
    // Set page title
    if (to.meta.title) {
      document.title = to.meta.title
    }
    
    // Check if route requires authentication
    if (to.meta.requiresAuth) {
      if (!auth.isAuthenticated) {
        // Redirect to login with return url
        next({
          name: 'AdminLogin',
          query: { redirect: to.fullPath }
        })
        return
      }
      
      // Check role permissions
      if (to.meta.roles && to.meta.roles.length > 0) {
        const hasRequiredRole = to.meta.roles.some(role => 
          auth.hasPermission(role) || auth.userInfo?.role === role
        )
        
        if (!hasRequiredRole) {
          next({
            name: 'AdminDashboard',
            query: { error: 'insufficient_permissions' }
          })
          return
        }
      }
    }
    
    // Hide login page if already authenticated
    if (to.meta.hideForAuth && auth.isAuthenticated) {
      next({ name: 'AdminDashboard' })
      return
    }
    
    // Handle redirect after login
    if (to.name === 'AdminLogin' && to.query.redirect && auth.isAuthenticated) {
      next(to.query.redirect)
      return
    }
    
    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    next()
  }
})

// Global after hook for analytics, etc.
router.afterEach((to, from) => {
  // Track page views, etc.
  console.log(`Navigated from ${from.name || 'Unknown'} to ${to.name || 'Unknown'}`)
})

// Error handling
router.onError((error) => {
  console.error('Router error:', error)
})

export default router