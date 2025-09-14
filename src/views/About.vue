<!-- src/views/About.vue -->
<template>
  <div class="py-16 container mx-auto px-4">
    <h1 class="text-4xl font-bold text-center mb-12">About Bookshelf</h1>
    <p class="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      Bookshelf is a modern, responsive single-page application built with Vue 3 and Tailwind CSS to help readers discover great books and authors.
    </p>

    <h2 class="text-2xl font-semibold mb-6">FAQ</h2>
    <div class="space-y-4 max-w-3xl mx-auto">
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="font-medium text-gray-800">How do I search for books?</h3>
        <p class="text-gray-600 mt-2">Use the search bar on the Books page to filter by title or author.</p>
      </div>
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="font-medium text-gray-800">Can I edit books?</h3>
        <p class="text-gray-600 mt-2">Yes! Admin users can create, edit, or delete books and authors via the Admin Dashboard.</p>
      </div>
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="font-medium text-gray-800">Is this app mobile-friendly?</h3>
        <p class="text-gray-600 mt-2">Absolutely! Designed mobile-first with Tailwind CSS for all screen sizes.</p>
      </div>
    </div>
  </div>
</template>