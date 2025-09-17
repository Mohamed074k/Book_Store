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
            <!-- WhatsApp -->
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.047 24l6.305-1.654a11.882 11.882 0 005.693 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <!-- Facebook -->
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M21.996 12.05c0-5.523-4.477-9.999-9.999-9.999C6.474 2.051 2 6.527 2 12.05c0 4.991 3.656 9.13 8.437 9.878v-6.988h-2.54V12.05h2.54V9.856c0-2.51 1.492-3.898 3.778-3.898.694 0 1.437.052 1.633.073v2.257h-1.41c-1.128 0-1.344.533-1.344 1.324v1.758h2.69l-.35 2.89h-2.34v6.988C18.338 21.18 22 17.042 22 12.05h-.004z"/>
              </svg>
            </div>
            <!-- Instagram -->
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
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
            <!-- Location -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span>Egypt - Kafr Elsheikh</span>
            </div>
            <!-- Email -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span>the.real.mohamed074@gmail.com</span>
            </div>
            <!-- Phone -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <span>+20 1228563612</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up">
        <div class="text-white/80 mb-4 md:mb-0">
          © {{ currentYear }} NovelHub. Made by <a href="http://www.linkedin.com/in/mohamed-elsayed-2623602a1" class="hover:text-white transition-colors duration-300 underline">Mohamed Elsayed</a>.
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