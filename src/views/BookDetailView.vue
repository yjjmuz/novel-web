<template>
  <div class="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 flex items-center justify-between">
      <button class="p-1" @click="$emit('back')">
        <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
      </button>
      <h1 class="text-lg font-bold text-[#1A1A1A]">贵妃书斋</h1>
      <button class="p-1">
        <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
      </button>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-400">正在获取详情...</p>
    </div>

    <template v-else-if="book">
      <!-- Book Info Header -->
      <div class="relative px-4 pt-6 pb-10 overflow-hidden">
        <!-- Background Gradient/Image -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#E0E7FF] to-[#F8F9FA] opacity-60"></div>
        
        <div class="relative flex justify-between items-start">
          <div class="flex-1 pr-4 pt-2">
            <h2 class="text-2xl font-bold text-[#1A1A1A] mb-2">{{ book.articlename }}</h2>
            <p class="text-sm text-gray-600 mb-1">{{ book.author }}</p>
            <p class="text-xs text-gray-400">{{ book.isvip ? 'VIP' : '免费' }}·{{ (book.words / 10000).toFixed(1) }}万字</p>
          </div>
          <div class="w-28 aspect-[3/4] rounded-lg overflow-hidden shadow-xl border border-white/50">
            <img :src="book.icon" alt="Cover" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>

      <!-- Introduction Section -->
      <div class="px-4 -mt-4">
        <div class="bg-white rounded-2xl p-5 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xl font-bold text-[#1A1A1A]">简介</h3>
          </div>
          <div class="relative">
            <p class="text-sm text-gray-600 leading-relaxed" :class="{ 'line-clamp-4': !isExpanded }">
              {{ book.intro }}
            </p>
            <button v-if="book.intro && book.intro.length > 100" class="absolute bottom-0 right-0 p-1 bg-white" @click="isExpanded = !isExpanded">
              <img src="/组 3341@2x.png" class="w-4 h-4 object-contain" :class="{ 'rotate-180': isExpanded }" alt="expand" />
            </button>
          </div>
        </div>
      </div>

      <!-- Catalog Section -->
      <div class="px-4 mt-4">
        <div class="bg-white rounded-2xl p-5 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-baseline gap-2">
              <h3 class="text-xl font-bold text-[#1A1A1A]">目录</h3>
              <span class="text-sm text-gray-400">({{ book.chapter?.length || 0 }}章)</span>
            </div>
            <button @click="$emit('catalog')" class="flex items-center gap-0.5 text-sm text-gray-400">
              更多
              <img src="/input_file_0.png" class="w-4 h-4 object-contain" alt="arrow" />
            </button>
          </div>

          <div class="flex flex-col gap-6">
            <div 
              v-for="(chapter, index) in book.chapter?.slice(0, 5)" 
              :key="index" 
              class="text-sm text-gray-600 active:text-[#7C3AED] cursor-pointer"
              @click="$emit('read', chapter.chapterid)"
            >
              {{ chapter.chaptername }}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-8 z-20">
        <div class="flex items-center gap-6">
          <button class="flex items-center gap-2">
            <img src="/vuesax_linear_music-play@2x.png" class="w-6 h-6 object-contain" alt="listen" />
            <span class="text-sm text-[#1A1A1A]">听书</span>
          </button>
          <button class="flex items-center gap-2" @click="toggleShelf">
            <img :src="isInShelf ? '/容器@2x(1).png' : '/容器@2x(2).png'" class="w-6 h-6 object-contain" alt="shelf" />
            <span class="text-sm text-gray-400">{{ isInShelf ? '已在书架' : '加入书架' }}</span>
          </button>
        </div>
        <button 
          class="flex-1 bg-[#7C8BFF] text-white font-bold py-3.5 rounded-xl text-base active:opacity-90 transition-opacity"
          @click="$emit('read', book.chapter?.[0]?.chapterid)"
        >
          立即阅读
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { getNovelDetail } from '../services/api';

const props = defineProps({
  bookId: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['back', 'read', 'catalog']);

const book = ref(null);
const loading = ref(true);
const isExpanded = ref(false);
const isInShelf = ref(false);

const fetchDetail = async () => {
  if (!props.bookId) return;
  loading.value = true;
  try {
    const data = await getNovelDetail(props.bookId);
    book.value = data;
    isInShelf.value = data.is_star;
  } catch (error) {
    console.error('Fetch novel detail error:', error);
    ElMessage.error('获取小说详情失败');
  } finally {
    loading.value = false;
  }
};

const toggleShelf = () => {
  isInShelf.value = !isInShelf.value;
  if (isInShelf.value) {
    ElMessage({
      type: 'success',
      message: '已加入书架',
    });
  } else {
    ElMessage({
      message: '已从书架移除',
    });
  }
};

watch(() => props.bookId, fetchDetail);

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, 0);
  });
  fetchDetail();
});
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
