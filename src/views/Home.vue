<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero -->
    <section class="py-20 text-center">
      <h1 class="text-5xl font-bold text-gray-800 mb-6">Discover Amazing Books</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Explore curated collections of fiction, mystery, sci-fi, and more — written by world-class authors.
      </p>
      <div class="mt-10 space-x-6">
        <router-link to="/books" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Browse Books
        </router-link>
        <router-link to="/admin" class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Admin Panel
        </router-link>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Why Choose Bookshelf?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-6 bg-white rounded-xl shadow">
          <h3 class="text-xl font-semibold mb-2">Curated Selection</h3>
          <p class="text-gray-600">Handpicked books from top authors.</p>
        </div>
        <div class="text-center p-6 bg-white rounded-xl shadow">
          <h3 class="text-xl font-semibold mb-2">Author Profiles</h3>
          <p class="text-gray-600">Learn about the minds behind the stories.</p>
        </div>
        <div class="text-center p-6 bg-white rounded-xl shadow">
          <h3 class="text-xl font-semibold mb-2">Easy Admin</h3>
          <p class="text-gray-600">Manage content with our simple dashboard.</p>
        </div>
      </div>
    </section>

    <!-- Recent Books -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Recent Additions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Skeletons -->
          <div v-for="n in 3" :key="n" class="bg-gray-100 h-64 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </section>
  </div>
</template>