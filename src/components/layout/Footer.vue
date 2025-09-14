<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="bg-gradient-hero text-white py-12 mt-auto relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="floating-element absolute top-4 left-8 text-2xl">📚</div>
      <div class="floating-element absolute bottom-8 right-12 text-2xl">✨</div>
      <div class="floating-element absolute top-1/2 left-1/4 text-xl">📖</div>
    </div>
    
    <div class="container mx-auto px-4 relative">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div class="animate-fade-in-left">
          <h3 class="text-2xl font-bold mb-4 text-gradient-accent">📚 Bookshelf</h3>
          <p class="text-white/80 mb-4">
            Your ultimate destination for discovering amazing books and connecting with talented authors.
          </p>
          <div class="flex space-x-4">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer hover-lift">
              <span class="text-sm">📱</span>
            </div>
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer hover-lift">
              <span class="text-sm">💬</span>
            </div>
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer hover-lift">
              <span class="text-sm">📧</span>
            </div>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="animate-fade-in-up">
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <nav class="space-y-2">
            <router-link to="/" class="block text-white/80 hover:text-white transition-colors duration-300">Home</router-link>
            <router-link to="/books" class="block text-white/80 hover:text-white transition-colors duration-300">Browse Books</router-link>
            <router-link to="/authors" class="block text-white/80 hover:text-white transition-colors duration-300">Meet Authors</router-link>
            <router-link to="/about" class="block text-white/80 hover:text-white transition-colors duration-300">About Us</router-link>
            <router-link to="/admin" class="block text-white/80 hover:text-white transition-colors duration-300">Admin Panel</router-link>
          </nav>
        </div>
        
        <!-- Contact -->
        <div class="animate-fade-in-right">
          <h4 class="text-lg font-semibold mb-4">Get in Touch</h4>
          <div class="space-y-3 text-white/80">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span class="text-sm">📍</span>
              </div>
              <span>Global Digital Library</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span class="text-sm">📧</span>
              </div>
              <span>hello@bookshelf.com</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span class="text-sm">📱</span>
              </div>
              <span>+1 (555) 123-BOOK</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up">
        <div class="text-white/80 mb-4 md:mb-0">
          © {{ currentYear }} Bookshelf. Made with ❤️ for book lovers.
        </div>
        <div class="flex space-x-6 text-sm text-white/80">
          <a href="#" class="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Terms of Service</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>