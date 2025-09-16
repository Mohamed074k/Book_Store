<!-- src/components/layout/Header.vue -->
<template>
  <header class="glass-effect border-b border-white/20 sticky top-0 z-50 backdrop-blur-lg">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-2xl font-extrabold text-gradient-primary tracking-tight animate-fade-in">
        📚 NovelHub
      </h1>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-6 font-medium animate-fade-in animation-delay-200">
        <router-link 
          to="/" 
          class="text-gray-700 hover:text-purple-600 transition-all duration-300 relative group"
          active-class="text-purple-600 font-semibold"
        >
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link 
          to="/about" 
          class="text-gray-700 hover:text-purple-600 transition-all duration-300 relative group"
          active-class="text-purple-600 font-semibold"
        >
          About
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link 
          to="/books" 
          class="text-gray-700 hover:text-purple-600 transition-all duration-300 relative group"
          active-class="text-purple-600 font-semibold"
        >
          Books
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link 
          to="/authors" 
          class="text-gray-700 hover:text-purple-600 transition-all duration-300 relative group"
          active-class="text-purple-600 font-semibold"
        >
          Authors
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link 
          to="/admin" 
          class="btn-primary text-white px-4 py-2 rounded-xl font-semibold hover-lift shadow-lg transition-all duration-300"
        >
          Admin
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        @click="isOpen = !isOpen" 
        class="md:hidden focus:outline-none text-gray-700 hover:text-purple-600 transition-colors duration-300 p-2 rounded-xl hover:bg-white/50"
      >
        <svg 
          v-if="!isOpen" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-7 w-7 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg 
          v-else 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-7 w-7 transition-transform duration-300 rotate-90" 
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
      class="md:hidden glass-effect border-t border-white/20 px-4 py-3 space-y-3 font-medium animate-slideDown backdrop-blur-lg"
    >
      <router-link 
        to="/" 
        class="block text-gray-700 hover:text-purple-600 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/50"
        active-class="text-purple-600 font-semibold bg-white/30"
        @click="closeMenu"
      >
        Home
      </router-link>
      <router-link 
        to="/about" 
        class="block text-gray-700 hover:text-purple-600 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/50"
        active-class="text-purple-600 font-semibold bg-white/30"
        @click="closeMenu"
      >
        About
      </router-link>
      <router-link 
        to="/books" 
        class="block text-gray-700 hover:text-purple-600 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/50"
        active-class="text-purple-600 font-semibold bg-white/30"
        @click="closeMenu"
      >
        Books
      </router-link>
      <router-link 
        to="/authors" 
        class="block text-gray-700 hover:text-purple-600 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/50"
        active-class="text-purple-600 font-semibold bg-white/30"
        @click="closeMenu"
      >
        Authors
      </router-link>
      <router-link 
        to="/admin" 
        class="block btn-primary text-white px-4 py-2 rounded-xl font-semibold hover-lift shadow-lg transition-all duration-300 text-center"
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