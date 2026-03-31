<template>
  <section class="bg-white rounded-2xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-4" v-if="title">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <button class="text-sm text-gray-400 flex items-center gap-1">
        更多 <ChevronRight class="w-4 h-4" />
      </button>
    </div>
    <div class="space-y-6">
      <div v-for="(book, index) in books" :key="index" class="flex gap-4 cursor-pointer active:opacity-70" @click="$emit('click-book', book)">
        <img :src="book.cover" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
        <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
          <div>
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-base font-bold line-clamp-1 leading-tight">{{ book.title }}</h3>
              <span v-if="book.isHot" class="bg-orange-500 text-white text-[10px] px-1 rounded flex-shrink-0">热门</span>
            </div>
            <p class="text-sm text-gray-500 mt-2 line-clamp-1">{{ book.desc }}</p>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2 text-xs text-gray-400">
              <span>{{ book.category }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{{ book.words }}</span>
            </div>
            <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">阅读{{ book.reads }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next';

defineProps({
  title: String,
  books: {
    type: Array,
    required: true
  }
});

defineEmits(['click-book']);
</script>
