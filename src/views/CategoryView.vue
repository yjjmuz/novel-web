<template>
  <div class="min-h-screen bg-white pb-20 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2">
      <div class="flex items-center justify-between mb-4">
        <button class="p-1">
          <X class="w-6 h-6 text-gray-600" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h1>
        <button class="p-1">
          <MoreHorizontal class="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>

    <!-- Category Tabs -->
    <nav class="flex items-center gap-8 px-6 py-6">
      <button 
        v-for="tab in ['男生', '女生']" 
        :key="tab"
        @click="activeGender = tab"
        :class="[
          'transition-all duration-200',
          activeGender === tab ? 'text-3xl font-bold text-[#0A1633]' : 'text-xl text-gray-400'
        ]"
      >
        {{ tab }}
      </button>
    </nav>

    <!-- Category Grid -->
    <main class="px-4 grid grid-cols-2 gap-x-4 gap-y-8">
      <div 
        v-for="(cat, index) in currentCategories" 
        :key="index" 
        class="flex items-center gap-3 cursor-pointer active:opacity-70"
        @click="$emit('select-category', cat.name)"
      >
        <img :src="cat.cover" class="w-16 h-20 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
        <div class="flex flex-col justify-center overflow-hidden">
          <h3 class="text-lg font-medium text-[#1A1A1A] truncate">{{ cat.name }}</h3>
          <p class="text-sm text-gray-400 mt-1">{{ cat.count }}部</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X, MoreHorizontal } from 'lucide-vue-next';

const activeGender = ref('女生');

defineEmits(['select-category']);

const femaleCategories = [
  { name: '古代言情', count: '30241', cover: 'https://picsum.photos/seed/cat1/200/300' },
  { name: '现代言情', count: '30241', cover: 'https://picsum.photos/seed/cat2/200/300' },
  { name: '玄幻言情', count: '30241', cover: 'https://picsum.photos/seed/cat3/200/300' },
  { name: '悬疑推理', count: '30241', cover: 'https://picsum.photos/seed/cat4/200/300' },
  { name: '浪漫青春', count: '30241', cover: 'https://picsum.photos/seed/cat5/200/300' },
  { name: '仙侠奇缘', count: '30241', cover: 'https://picsum.photos/seed/cat6/200/300' },
  { name: '科幻空间', count: '30241', cover: 'https://picsum.photos/seed/cat7/200/300' },
  { name: '游戏竞技', count: '30241', cover: 'https://picsum.photos/seed/cat8/200/300' },
  { name: '轻小说', count: '30241', cover: 'https://picsum.photos/seed/cat9/200/300' },
  { name: '短篇', count: '30241', cover: 'https://picsum.photos/seed/cat10/200/300' },
  { name: '现实生活', count: '30241', cover: 'https://picsum.photos/seed/cat11/200/300' },
];

const maleCategories = [
  { name: '玄幻', count: '45210', cover: 'https://picsum.photos/seed/mcat1/200/300' },
  { name: '奇幻', count: '12340', cover: 'https://picsum.photos/seed/mcat2/200/300' },
  { name: '武侠', count: '8900', cover: 'https://picsum.photos/seed/mcat3/200/300' },
  { name: '仙侠', count: '34210', cover: 'https://picsum.photos/seed/mcat4/200/300' },
  { name: '都市', count: '98210', cover: 'https://picsum.photos/seed/mcat5/200/300' },
  { name: '历史', count: '15210', cover: 'https://picsum.photos/seed/mcat6/200/300' },
  { name: '军事', count: '7210', cover: 'https://picsum.photos/seed/mcat7/200/300' },
  { name: '游戏', count: '23210', cover: 'https://picsum.photos/seed/mcat8/200/300' },
];

const currentCategories = computed(() => {
  return activeGender.value === '女生' ? femaleCategories : maleCategories;
});
</script>
