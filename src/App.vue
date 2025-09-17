 <template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
     <component :is="currentLayout" v-if="currentLayout">
      <router-view />
    </component>

     <div v-else class="flex flex-col min-h-screen">
      <Header />
      <main class="flex-grow">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

const route = useRoute()

 const currentLayout = computed(() => {
  if (route.meta.layout === 'Public') return PublicLayout
  if (route.meta.layout === 'Admin') return AdminLayout
  return null 
})
</script>