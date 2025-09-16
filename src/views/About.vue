<!-- src/views/About.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <!-- Hero Section -->
    <section class="bg-gradient-hero text-white py-20 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="floating-element absolute top-20 left-10 text-3xl">📚</div>
        <div class="floating-element absolute top-40 right-20 text-3xl">✨</div>
        <div class="floating-element absolute bottom-32 left-1/4 text-3xl">💡</div>
        <div class="floating-element absolute bottom-20 right-1/3 text-3xl">🎯</div>
      </div>
      
      <div class="container mx-auto px-4 text-center relative">
        <h1 class="text-5xl font-bold mb-6 animate-fade-in-up">About NovelHub</h1>
        <p class="text-xl opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Your ultimate destination for discovering exceptional books and connecting with brilliant authors
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <!-- Introduction -->
        <div class="max-w-4xl mx-auto mb-16">
          <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up">
            <h2 class="text-3xl font-bold mb-6 text-gradient-primary">Our Story</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              NovelHub is a modern, responsive single-page application built with Vue 3 and Tailwind CSS to help readers discover great books and authors. We believe that every story has the power to inspire, educate, and transform lives.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Our platform combines cutting-edge technology with a passion for literature, creating an immersive experience that connects readers with their next favorite book and introduces them to the talented minds behind those stories.
            </p>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div class="bg-gradient-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up">
            <div class="w-16 h-16 mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Rich Collection</h3>
            <p class="text-gray-600">Curated selection of books across multiple genres from talented authors worldwide.</p>
          </div>

          <div class="bg-gradient-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up animation-delay-200">
            <div class="w-16 h-16 mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Smart Search</h3>
            <p class="text-gray-600">Powerful search and filtering capabilities to help you find exactly what you're looking for.</p>
          </div>

          <div class="bg-gradient-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up animation-delay-400">
            <div class="w-16 h-16 mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Author Profiles</h3>
            <p class="text-gray-600">Detailed author information and biography to connect you with the minds behind the stories.</p>
          </div>

          <div class="bg-gradient-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up animation-delay-600">
            <div class="w-16 h-16 mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Easy Management</h3>
            <p class="text-gray-600">Powerful admin dashboard for managing books and authors with intuitive controls.</p>
          </div>

          <div class="bg-gradient-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up animation-delay-800">
            <div class="w-16 h-16 mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Mobile Friendly</h3>
            <p class="text-gray-600">Fully responsive design that works beautifully on all devices and screen sizes.</p>
          </div>

          <div class="bg-gradient-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up animation-delay-1000">
            <div class="w-16 h-16 mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Fast & Modern</h3>
            <p class="text-gray-600">Built with Vue 3 and modern web technologies for optimal performance and user experience.</p>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12 text-gradient-primary animate-fade-in-up">Frequently Asked Questions</h2>
          <div class="space-y-6">
            <div 
              v-for="(faq, index) in faqs"
              :key="index"
              class="glass-effect rounded-3xl shadow-xl hover-lift animate-fade-in-up transition-all duration-300"
              :class="{ 'animate-fade-in-up animation-delay-200': index === 1, 'animate-fade-in-up animation-delay-400': index === 2, 'animate-fade-in-up animation-delay-600': index === 3 }"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full p-8 text-left focus:outline-none group"
              >
                <div class="flex justify-between items-start">
                  <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300 flex-1 pr-4">
                    {{ faq.question }}
                  </h3>
                  <div class="flex-shrink-0 ml-4">
                    <svg 
                      class="w-6 h-6 text-purple-600 transition-transform duration-300"
                      :class="{ 'rotate-180': openFaqIndex === index }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                <div 
                  v-if="openFaqIndex === index"
                  class="mt-4 animate-fade-in-up"
                >
                  <div class="border-t border-purple-200/30 pt-4">
                    <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-hero text-white relative overflow-hidden">
      <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-4xl font-bold mb-6 animate-fade-in-up">Ready to Explore?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Start your literary journey today and discover amazing books from talented authors.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
          <router-link
            to="/books"
            class="btn-primary bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover-lift shadow-xl"
          >
            Browse Books
          </router-link>
          <router-link
            to="/authors"
            class="btn-accent bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 glass-effect"
          >
            Meet Authors
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openFaqIndex = ref(null)

const faqs = ref([
  {
    question: "How do I search for books?",
    answer: "Use the search bar on the Books page to filter by title, or use the author dropdown to find books by specific authors. You can combine both filters for more precise results."
  },
  {
    question: "Can I manage the book collection?",
    answer: "Yes! Admin users can create, edit, and delete books and authors via the Admin Dashboard. The interface is intuitive and designed for easy content management."
  },
  {
    question: "Is this app mobile-friendly?",
    answer: "Absolutely! The app is designed with a mobile-first approach using Tailwind CSS, ensuring a beautiful experience across all devices and screen sizes."
  },
  {
    question: "What technologies power this platform?",
    answer: "NovelHub is built with Vue 3, Pinia for state management, Vue Router for navigation, and Tailwind CSS for styling. It's a modern single-page application optimized for performance."
  }
])

const toggleFaq = (index) => {
  if (openFaqIndex.value === index) {
    openFaqIndex.value = null
  } else {
    openFaqIndex.value = index
  }
}
</script>