<template>
  <div class="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 border-b border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <button class="p-1" @click="$emit('back')">
          <img src="/input_file_37.png" class="w-6 h-6 object-contain" alt="back" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h1>
        <button class="p-1">
          <img src="/input_file_29.png" class="w-6 h-6 object-contain" alt="more" />
        </button>
      </div>
      
      <!-- Search Input Area -->
      <div class="flex items-center gap-3">
        <div class="flex-1 bg-[#F5F6F7] rounded-lg flex items-center px-3 py-2">
          <img src="/input_file_15.png" class="w-4 h-4 object-contain mr-2" alt="search" />
          <input 
            v-model="searchText" 
            type="text" 
            placeholder="输入书名或作者" 
            class="bg-transparent border-none outline-none text-sm w-full"
            @keyup.enter="handleSearch"
          />
          <button v-if="searchText" @click="searchText = ''; isSearching = false" class="ml-2">
            <img src="/input_file_37.png" class="w-4 h-4 object-contain" alt="clear" />
          </button>
        </div>
        <button class="text-sm text-gray-500" @click="handleCancel">取消</button>
      </div>
    </header>

    <!-- Content -->
    <main class="p-4">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
        <div class="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm text-gray-400">正在搜索...</p>
      </div>

      <!-- Search Results State -->
      <div v-else-if="isSearching" class="space-y-6">
        <!-- Best Match -->
        <div v-if="bestMatch" class="bg-white rounded-2xl p-4 shadow-sm cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail', bestMatch.id)">
          <div class="flex gap-4">
            <img :src="bestMatch.cover" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
            <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
              <div>
                <h3 class="text-base font-bold text-red-500 line-clamp-1 leading-tight">{{ bestMatch.title }}</h3>
                <p class="text-sm text-gray-500 mt-2 line-clamp-1">{{ bestMatch.desc }}</p>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-2 text-xs text-gray-400">
                  <span>{{ bestMatch.category }}</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{{ bestMatch.words }}</span>
                </div>
                <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">阅读{{ bestMatch.reads }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Results -->
        <div v-if="otherResults.length > 0">
          <h2 class="text-lg font-bold mb-4">其他相关</h2>
          <div class="bg-white rounded-2xl p-4 shadow-sm space-y-8">
            <div v-for="(book, index) in otherResults" :key="index" class="flex gap-4 cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail', book.id)">
              <img :src="book.cover" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
              <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
                <div>
                  <h3 class="text-base font-bold line-clamp-1 leading-tight">
                    {{ book.title }}
                  </h3>
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
        </div>

        <!-- No Results -->
        <div v-if="!bestMatch && otherResults.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-400">
          <p>未找到相关书籍</p>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="space-y-8">
        <!-- Search History -->
        <div v-if="history.length > 0">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">搜索历史</h2>
            <button @click="clearHistory">
              <img src="/input_file_4.png" class="w-5 h-5 object-contain" alt="delete" />
            </button>
          </div>
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="item in history" 
              :key="item" 
              class="px-4 py-1.5 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-50 active:bg-gray-100"
              @click="searchText = item; handleSearch()"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <!-- Recommended Search -->
        <div v-if="recommendations.length > 0">
          <h2 class="text-lg font-bold mb-4">推荐搜索</h2>
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="(item, index) in recommendations" 
              :key="index" 
              class="px-4 py-1.5 rounded-full text-sm shadow-sm border border-gray-50 active:opacity-70"
              :class="index < 2 ? 'bg-[#FFF1F0] text-[#FF4D4F]' : 'bg-white text-gray-700'"
              @click="searchText = item; handleSearch()"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getHotSearch, searchNovels } from '../services/api';

const emit = defineEmits(['back', 'navigate']);

const searchText = ref('');
const isSearching = ref(false);
const loading = ref(false);
const history = ref(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
const recommendations = ref([]);
const bestMatch = ref(null);
const otherResults = ref([]);

const normalizeBook = (book) => {
  if (!book) return null;
  return {
    id: book.articleid,
    title: book.articlename,
    cover: book.icon,
    desc: book.intro,
    author: book.author,
    words: book.words ? `${(book.words / 10000).toFixed(1)}万字` : '未知',
    category: book.type_txt || '其他',
    reads: book.allvisit ? `${(book.allvisit / 10000).toFixed(1)}万` : '0'
  };
};

const fetchHotSearch = async () => {
  try {
    const data = await getHotSearch();
    recommendations.value = data;
  } catch (error) {
    console.error('Fetch hot search error:', error);
  }
};

const handleSearch = async () => {
  if (!searchText.value.trim()) return;
  
  loading.value = true;
  isSearching.value = true;
  
  try {
    const data = await searchNovels(searchText.value.trim());
    bestMatch.value = normalizeBook(data.search);
    otherResults.value = (data.other || []).map(normalizeBook);
    
    // Update history
    if (!history.value.includes(searchText.value)) {
      history.value.unshift(searchText.value);
      if (history.value.length > 10) history.value.pop();
      localStorage.setItem('searchHistory', JSON.stringify(history.value));
    }
  } catch (error) {
    console.error('Search error:', error);
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  if (isSearching.value) {
    isSearching.value = false;
    searchText.value = '';
    bestMatch.value = null;
    otherResults.value = [];
  } else {
    emit('back');
  }
};

const clearHistory = () => {
  history.value = [];
  localStorage.removeItem('searchHistory');
};

onMounted(fetchHotSearch);
</script>
