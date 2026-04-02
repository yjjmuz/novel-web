<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-20 font-sans text-[#333]">
    <Header @search="$emit('search')" />
    <BannerCarousel :banners="banners" />

    <!-- Tabs -->
    <nav class="flex items-center gap-6 px-4 py-4 overflow-x-auto no-scrollbar">
      <button 
        v-for="tab in ['推荐', '男生', '女生']" 
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'relative transition-all duration-200 flex-shrink-0',
          activeTab === tab ? 'text-2xl font-bold text-[#1A1A1A]' : 'text-lg text-gray-500'
        ]"
      >
        {{ tab }}
        <span 
          v-if="activeTab === tab" 
          class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-orange-500 rounded-full"
        ></span>
      </button>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-400">正在加载精彩内容...</p>
    </div>

    <!-- Content Sections -->
    <main v-else class="px-4 space-y-6">
      <RankingSection :books="rankingBooks" @click-book="handleBookClick" />
      <HotPicksSection title="热门精品" :books="hotPicks" @click-book="handleBookClick" />
      <BookGrid title="免费书籍" :books="freeBooks" @click-book="handleBookClick" />
      <BookGrid title="完结书籍" :books="completedBooks" @click-book="handleBookClick" />
      <HotPicksSection title="最近更新" :books="newBooks" @click-book="handleBookClick" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import Header from '../components/Header.vue';
import BannerCarousel from '../components/BannerCarousel.vue';
import RankingSection from '../components/RankingSection.vue';
import HotPicksSection from '../components/HotPicksSection.vue';
import BookGrid from '../components/BookGrid.vue';
import { getHomeData } from '../services/api';

const activeTab = ref('推荐');
const loading = ref(true);
const banners = ref([]);
const rankingBooks = ref([]);
const hotPicks = ref([]);
const freeBooks = ref([]);
const completedBooks = ref([]);
const newBooks = ref([]);

const emit = defineEmits(['search', 'navigate']);

const normalizeBook = (book) => ({
  id: book.articleid,
  title: book.articlename,
  cover: book.icon,
  desc: book.intro,
  author: book.author,
  words: book.words ? `${(book.words / 10000).toFixed(1)}万字` : '未知',
  category: book.type_txt || '其他',
  reads: book.allvisit ? `${(book.allvisit / 10000).toFixed(1)}万` : '0',
  isHot: true
});

const fetchData = async () => {
  loading.value = true;
  try {
    const channel = activeTab.value === '女生' ? '1' : '2';
    const data = await getHomeData(channel);
    
    banners.value = data.banners.map(b => b.img);
    rankingBooks.value = data.rank.map(normalizeBook);
    hotPicks.value = data.hot.map(normalizeBook);
    freeBooks.value = data.free.map(normalizeBook);
    completedBooks.value = data.full.map(normalizeBook);
    newBooks.value = data.new.map(normalizeBook);
  } catch (error) {
    console.error('Fetch error:', error);
  } finally {
    loading.value = false;
  }
};

const handleBookClick = (book) => {
  emit('navigate', 'bookDetail', book.id);
};

watch(activeTab, fetchData);

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, 0);
  });
  fetchData();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
