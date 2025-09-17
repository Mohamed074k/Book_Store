 <template>
  <div
    v-for="n in repeat"
    :key="n"
    :class="[height, 'bg-gray-200 rounded animate-pulse']"
    class="w-full"
  ></div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
    default: 'h-4'
  },
  repeat: {
    type: Number,
    default: 1
  }
})
</script>