<template>
  <section class="bg-white rounded-2xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-4" v-if="title">
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <button class="text-sm text-gray-400 flex items-center gap-1">
        更多 <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
      </button>
    </div>
    <div class="space-y-6">
      <div v-for="(book, index) in books.slice(0, 3)" :key="index" class="flex gap-4 cursor-pointer active:opacity-70" @click="$emit('click-book', book)">
        <div class="relative w-20 h-28 flex-shrink-0">
          <img :src="book.cover" class="w-full h-full object-cover rounded shadow-sm border border-gray-50" referrerPolicy="no-referrer" />
        </div>
        <div class="flex-1 flex flex-col justify-start py-1 overflow-hidden">
          <div class="flex items-start gap-2">
            <span :class="['text-lg font-bold italic leading-tight', index < 3 ? 'text-orange-400' : 'text-gray-300']">{{ index + 1 }}</span>
            <h3 class="text-base font-bold line-clamp-1 leading-tight text-[#1A1A1A]">{{ book.title }}</h3>
          </div>
          <p class="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">{{ book.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  books: {
    type: Array,
    required: true
  }
});

defineEmits(['click-book']);
</script>
