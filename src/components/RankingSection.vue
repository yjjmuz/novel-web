<template>
  <section class="bg-white rounded-2xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold">排行榜</h2>
      <button class="text-sm text-gray-400 flex items-center gap-1">
        完整榜单 <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
      </button>
    </div>
    <div class="grid grid-cols-2 gap-x-4 gap-y-6">
      <div v-for="(book, index) in books" :key="index" class="flex gap-2 cursor-pointer active:opacity-70" @click="$emit('click-book', book)">
        <div class="relative w-16 h-22 flex-shrink-0">
          <img :src="book.cover" class="w-full h-full object-cover rounded shadow-sm border border-gray-50" referrerPolicy="no-referrer" />
        </div>
        <div class="flex flex-col justify-start py-0.5 overflow-hidden">
          <div class="flex items-start gap-1">
            <span :class="['text-base font-bold italic leading-tight', index < 3 ? 'text-orange-400' : 'text-gray-300']">{{ index + 1 }}</span>
            <h3 class="text-sm font-bold line-clamp-2 leading-tight text-[#1A1A1A]">{{ book.title }}</h3>
          </div>
          <p class="text-[11px] text-gray-400 mt-auto">{{ book.words }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  books: {
    type: Array,
    required: true
  }
});

defineEmits(['click-book']);
</script>
