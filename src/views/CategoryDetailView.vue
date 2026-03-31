<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-10 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 border-b border-gray-100">
      <div class="flex items-center justify-between">
        <button class="p-1" @click="$emit('back')">
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="close" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">{{ categoryName }}</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
        </button>
      </div>
    </header>

    <!-- Book List -->
    <main class="p-4">
      <div class="bg-white rounded-2xl p-4 shadow-sm space-y-8">
        <div v-for="(book, index) in books" :key="index" class="flex gap-4 cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail')">
          <img :src="book.cover" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
          <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
            <div>
              <h3 class="text-base font-bold line-clamp-1 leading-tight">{{ book.title }}</h3>
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
    </main>
  </div>
</template>

<script setup>
defineProps({
  categoryName: {
    type: String,
    default: '古代言情'
  }
});

defineEmits(['back', 'navigate']);

const books = [
  { 
    title: '遮天之从蓝日开始', 
    desc: '行医第一方：让求医夫妻和离，震惊大宋。',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det1/200/300'
  },
  { 
    title: '遮天之师兄说得对', 
    desc: '修仙觅长生，热血任逍遥，踏莲曳波涤剑骨',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det2/200/300'
  },
  { 
    title: '遮天之深空彼岸', 
    desc: '浩瀚的宇宙中，一片星系的生灭',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det3/200/300'
  },
  { 
    title: '遮天之我为长生仙', 
    desc: '仙神妖魔，王侯将相；龙女掌灯，杯中盛海',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det4/200/300'
  },
  { 
    title: '遮天之师兄说得对', 
    desc: '修仙觅长生，热血任逍遥，踏莲曳波涤剑骨',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det5/200/300'
  },
  { 
    title: '遮天之深空彼岸', 
    desc: '浩瀚的宇宙中，一片星系的生灭',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det6/200/300'
  },
  { 
    title: '遮天之师兄说得对', 
    desc: '修仙觅长生，热血任逍遥，踏莲曳波涤剑骨',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    cover: 'https://picsum.photos/seed/det7/200/300'
  },
];
</script>
