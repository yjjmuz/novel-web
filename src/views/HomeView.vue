<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-20 font-sans text-[#333]">
    <Header @search="$emit('search')" />

    <!-- Tabs -->
    <nav class="flex items-center gap-6 px-4 py-4">
      <button 
        v-for="tab in ['推荐', '男生', '女生']" 
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'relative transition-all duration-200',
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

    <!-- Content Sections -->
    <main class="px-4 space-y-6">
      <template v-if="activeTab === '推荐'">
        <RankingSection :books="rankingBooks" @click-book="$emit('navigate', 'bookDetail')" />
        <HotPicksSection title="热门精品" :books="hotPicks" @click-book="$emit('navigate', 'bookDetail')" />
        <BookGrid title="免费书籍" :books="freeBooks" @click-book="$emit('navigate', 'bookDetail')" />
        <BookGrid title="完结书籍" :books="completedBooks" @click-book="$emit('navigate', 'bookDetail')" />
        <HotPicksSection :books="hotPicks" @click-book="$emit('navigate', 'bookDetail')" />
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center py-20 text-gray-400">
          <img src="/input_file_38.png" class="w-12 h-12 mb-2 opacity-20 object-contain" alt="empty" />
          <p>{{ activeTab }}频道内容正在加载中...</p>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import RankingSection from '../components/RankingSection.vue';
import HotPicksSection from '../components/HotPicksSection.vue';
import BookGrid from '../components/BookGrid.vue';

const activeTab = ref('推荐');

defineEmits(['search', 'navigate']);

const rankingBooks = [
  { title: '农家小娇妻·宠你没商量', words: '205万字', cover: 'https://picsum.photos/seed/book1/200/300' },
  { title: '农家小娇妻·宠你没商量', words: '205万字', cover: 'https://picsum.photos/seed/book2/200/300' },
  { title: '剑道天穹阁', words: '105万字', cover: 'https://picsum.photos/seed/book3/200/300' },
  { title: '农家小娇妻·宠你没商量', words: '205万字', cover: 'https://picsum.photos/seed/book4/200/300' },
  { title: '浮生六记·浮生若梦 人生几何', words: '205万字', cover: 'https://picsum.photos/seed/book5/200/300' },
  { title: '农家小娇妻·宠你没商量', words: '205万字', cover: 'https://picsum.photos/seed/book6/200/300' },
];

const hotPicks = [
  { 
    title: '大宋医相：开局和李清照私定...', 
    desc: '行医第一方：让求医夫妻和离，震惊大宋。',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    isHot: true,
    cover: 'https://picsum.photos/seed/hot1/200/300'
  },
  { 
    title: '师兄说得对', 
    desc: '修仙觅长生，热血任逍遥，踏莲曳波涤剑骨',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    isHot: true,
    cover: 'https://picsum.photos/seed/hot2/200/300'
  },
  { 
    title: '深空彼岸', 
    desc: '浩瀚的宇宙中，一片星系的生灭',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    isHot: true,
    cover: 'https://picsum.photos/seed/hot3/200/300'
  },
  { 
    title: '我为长生仙', 
    desc: '仙神妖魔，王侯将相；龙女掌灯，杯中盛海',
    category: '穿越',
    words: '205万字',
    reads: '156万',
    isHot: true,
    cover: 'https://picsum.photos/seed/hot4/200/300'
  },
];

const freeBooks = [
  { title: '师兄说得对', cover: 'https://picsum.photos/seed/free1/200/300' },
  { title: '深空彼岸之逆仙伐圣', cover: 'https://picsum.photos/seed/free2/200/300' },
  { title: '师兄说得对我没道理', cover: 'https://picsum.photos/seed/free3/200/300' },
  { title: '蓝日', cover: 'https://picsum.photos/seed/free4/200/300' },
  { title: '农家小娇妻·宠你', cover: 'https://picsum.photos/seed/free5/200/300' },
  { title: '剑道天穹阁', cover: 'https://picsum.photos/seed/free6/200/300' },
  { title: '窗外往事', cover: 'https://picsum.photos/seed/free7/200/300' },
  { title: '浮生六记', cover: 'https://picsum.photos/seed/free8/200/300' },
];

const completedBooks = [
  { title: '师兄说得对我没道理', cover: 'https://picsum.photos/seed/comp1/200/300' },
  { title: '剑道天穹阁', cover: 'https://picsum.photos/seed/comp2/200/300' },
  { title: '师兄说得对', cover: 'https://picsum.photos/seed/comp3/200/300' },
  { title: '蓝日', cover: 'https://picsum.photos/seed/comp4/200/300' },
  { title: '浮生六记', cover: 'https://picsum.photos/seed/comp5/200/300' },
  { title: '深空彼岸之逆仙伐圣', cover: 'https://picsum.photos/seed/comp6/200/300' },
  { title: '窗外往事', cover: 'https://picsum.photos/seed/comp7/200/300' },
  { title: '农家小娇妻·宠你', cover: 'https://picsum.photos/seed/comp8/200/300' },
];
</script>
