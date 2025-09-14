 <!-- src/components/layout/Header.vue -->
<template>
  <header class="bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-2xl font-extrabold text-gray-800 tracking-tight">📚 Bookshelf</h1>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-6 font-medium">
        <router-link to="/" class="text-gray-700 hover:text-blue-600 transition">Home</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-blue-600 transition">About</router-link>
        <router-link to="/books" class="text-gray-700 hover:text-blue-600 transition">Books</router-link>
        <router-link to="/authors" class="text-gray-700 hover:text-blue-600 transition">Authors</router-link>
        <router-link 
          to="/admin" 
          class="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold hover:bg-blue-200 transition"
        >
          Admin
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        @click="isOpen = !isOpen" 
        class="md:hidden focus:outline-none text-gray-700"
      >
        <svg 
          v-if="!isOpen" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-7 w-7" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-7 w-7" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    <div 
      v-if="isOpen" 
      class="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3 space-y-3 font-medium animate-slideDown"
    >
      <router-link 
        to="/" 
        class="block text-gray-700 hover:text-blue-600 transition"
        @click="closeMenu"
      >
        Home
      </router-link>
      <router-link 
        to="/about" 
        class="block text-gray-700 hover:text-blue-600 transition"
        @click="closeMenu"
      >
        About
      </router-link>
      <router-link 
        to="/books" 
        class="block text-gray-700 hover:text-blue-600 transition"
        @click="closeMenu"
      >
        Books
      </router-link>
      <router-link 
        to="/authors" 
        class="block text-gray-700 hover:text-blue-600 transition"
        @click="closeMenu"
      >
        Authors
      </router-link>
      <router-link 
        to="/admin" 
        class="block bg-blue-100 text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
        @click="closeMenu"
      >
        Admin
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const closeMenu = () => {
  isOpen.value = false;
};
</script>
