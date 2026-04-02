<template>
  <div class="min-h-screen bg-white pb-20 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2">
      <div class="flex items-center justify-between mb-4">
        <button class="p-1">
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
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

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-400">正在获取分类...</p>
    </div>

    <!-- Category Grid -->
    <main v-else class="px-4 grid grid-cols-2 gap-x-4 gap-y-8">
      <div 
        v-for="(cat, index) in categories" 
        :key="index" 
        class="flex items-center gap-3 cursor-pointer active:opacity-70"
        @click="$emit('select-category', { id: cat.id, name: cat.name })"
      >
        <img :src="cat.img" class="w-16 h-20 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
        <div class="flex flex-col justify-center overflow-hidden">
          <h3 class="text-lg font-medium text-[#1A1A1A] truncate">{{ cat.name }}</h3>
          <p class="text-sm text-gray-400 mt-1">{{ cat.num }}部</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { getCategoryList } from '../services/api';

const activeGender = ref('男生');
const loading = ref(true);
const categories = ref([]);

defineEmits(['select-category']);

const fetchCategories = async () => {
  loading.value = true;
  try {
    const channel = activeGender.value === '女生' ? '1' : '2';
    const data = await getCategoryList(channel);
    categories.value = data;
  } catch (error) {
    console.error('Fetch categories error:', error);
  } finally {
    loading.value = false;
  }
};

watch(activeGender, fetchCategories);

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, 0);
  });
  fetchCategories();
});
</script>
