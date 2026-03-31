<template>
  <section class="bg-white rounded-2xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold">排行榜</h2>
      <button class="text-sm text-gray-400 flex items-center gap-1">
        完整榜单 <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
      </button>
    </div>
    <div class="grid grid-cols-2 gap-x-4 gap-y-6">
      <div v-for="(book, index) in books" :key="index" class="flex gap-3 cursor-pointer active:opacity-70" @click="$emit('click-book', book)">
        <div class="relative w-16 h-20 flex-shrink-0">
          <img :src="book.cover" class="w-full h-full object-cover rounded shadow-sm" referrerPolicy="no-referrer" />
          <span class="absolute top-0 left-0 w-5 h-5 bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold rounded-br-lg">
            {{ index + 1 }}
          </span>
        </div>
        <div class="flex flex-col justify-between py-0.5 overflow-hidden">
          <h3 class="text-sm font-bold truncate leading-tight">{{ book.title }}</h3>
          <p class="text-[11px] text-gray-400">{{ book.words }}</p>
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
