<!-- src/components/layout/Header.vue -->
<template>
  <header class="bg-white shadow-sm border-b">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-800">Bookshelf</h1>
      <nav class="hidden md:flex space-x-6">
        <router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-blue-600">About</router-link>
        <router-link to="/books" class="text-gray-700 hover:text-blue-600">Books</router-link>
        <router-link to="/authors" class="text-gray-700 hover:text-blue-600">Authors</router-link>
        <router-link to="/admin" class="bg-blue-100 text-blue-800 px-3 py-1 rounded font-medium hover:bg-blue-200 transition">
          Admin
        </router-link>
      </nav>
    </div>
  </header>
</template>