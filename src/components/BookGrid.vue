<template>
  <section class="bg-white rounded-2xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <button class="text-sm text-gray-400 flex items-center gap-1">
        更多 <ChevronRight class="w-4 h-4" />
      </button>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <div v-for="(book, index) in books" :key="index" class="space-y-2 cursor-pointer active:opacity-70" @click="$emit('click-book', book)">
        <img :src="book.cover" class="w-full aspect-[3/4] object-cover rounded shadow-sm" referrerPolicy="no-referrer" />
        <h3 class="text-xs font-medium line-clamp-2 leading-tight">{{ book.title }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next';

defineProps({
  title: {
    type: String,
    required: true
  },
  books: {
    type: Array,
    required: true
  }
});

defineEmits(['click-book']);
</script>
