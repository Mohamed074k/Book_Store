 <template>
  <div class="text-center">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">{{ title }}</h2>
    <p class="text-gray-500">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String
})
</script>