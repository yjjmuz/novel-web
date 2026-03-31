<template>
  <div class="min-h-screen bg-[#F8F9FA] font-sans text-[#333]">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 border-b border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <button class="p-1" @click="$emit('back')">
          <X class="w-6 h-6 text-gray-600" />
        </button>
        <h1 class="text-xl font-bold text-[#1A1A1A]">贵妃书斋</h1>
        <button class="p-1">
          <MoreHorizontal class="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      <!-- Search Input Area -->
      <div class="flex items-center gap-3">
        <div class="flex-1 bg-[#F5F6F7] rounded-lg flex items-center px-3 py-2">
          <Search class="w-4 h-4 text-gray-400 mr-2" />
          <input 
            v-model="searchText" 
            type="text" 
            placeholder="龙骑战机·热血爆燃" 
            class="bg-transparent border-none outline-none text-sm w-full"
            @keyup.enter="handleSearch"
          />
          <button v-if="searchText" @click="searchText = ''" class="ml-2">
            <XCircle class="w-4 h-4 text-gray-300" />
          </button>
        </div>
        <button class="text-sm text-gray-500" @click="handleCancel">取消</button>
      </div>
    </header>

    <!-- Content -->
    <main class="p-4">
      <!-- Search Results State -->
      <div v-if="isSearching" class="space-y-6">
        <!-- Best Match -->
        <div class="bg-white rounded-2xl p-4 shadow-sm cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail')">
          <div class="flex gap-4">
            <img src="https://picsum.photos/seed/search1/200/300" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
            <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
              <div>
                <h3 class="text-base font-bold text-red-500 line-clamp-1 leading-tight">{{ searchText }}</h3>
                <p class="text-sm text-gray-500 mt-2 line-clamp-1">修仙觅长生，热血任逍遥，踏莲曳波涤剑骨</p>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-2 text-xs text-gray-400">
                  <span>穿越</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>205万字</span>
                </div>
                <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">阅读156万</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Results -->
        <div>
          <h2 class="text-lg font-bold mb-4">其他相关</h2>
          <div class="bg-white rounded-2xl p-4 shadow-sm space-y-8">
            <div v-for="i in 4" :key="i" class="flex gap-4 cursor-pointer active:opacity-70" @click="$emit('navigate', 'bookDetail')">
              <img :src="`https://picsum.photos/seed/search_res_${i}/200/300`" class="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0" referrerPolicy="no-referrer" />
              <div class="flex-1 flex flex-col justify-between py-1 overflow-hidden">
                <div>
                  <h3 class="text-base font-bold line-clamp-1 leading-tight">
                    <span class="text-red-500">{{ searchText }}</span>之从蓝日开始
                  </h3>
                  <p class="text-sm text-gray-500 mt-2 line-clamp-1">行医第一方：让求医夫妻和离，震惊大宋。</p>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-center gap-2 text-xs text-gray-400">
                    <span>穿越</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>205万字</span>
                  </div>
                  <span class="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">阅读156万</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="space-y-8">
        <!-- Search History -->
        <div v-if="history.length > 0">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">搜索历史</h2>
            <button @click="clearHistory">
              <Trash2 class="w-5 h-5 text-gray-400" />
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
        <div>
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

        <!-- Hot Search List -->
        <div class="bg-gradient-to-b from-[#FFF1F0] to-white rounded-2xl p-4 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-[#FF4D4F]">热搜作品榜</h2>
            <button class="text-sm text-gray-400 flex items-center">
              更多 <ChevronRight class="w-4 h-4 ml-0.5" />
            </button>
          </div>
          <div class="space-y-6">
            <div v-for="(item, index) in hotList" :key="index" class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span 
                  class="w-5 h-5 flex items-center justify-center rounded text-xs font-bold"
                  :class="index < 3 ? 'bg-[#FF4D4F] text-white' : 'text-[#FF4D4F]'"
                >
                  {{ index + 1 }}
                </span>
                <span class="text-base font-medium text-gray-800 truncate max-w-[180px]">{{ item.name }}</span>
              </div>
              <div class="flex items-center gap-1 text-xs text-gray-400">
                <Flame class="w-3 h-3 text-[#FF4D4F]" />
                <span>{{ item.hot }}热度</span>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <ChevronDown class="w-6 h-6 text-gray-300 bg-gray-100 rounded-full p-1" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { X, MoreHorizontal, Search, XCircle, Trash2, ChevronRight, Flame, ChevronDown } from 'lucide-vue-next';

const emit = defineEmits(['back', 'navigate']);

const searchText = ref('');
const isSearching = ref(false);
const history = ref(['遮天', '完美世界']);
const recommendations = ['遮天', '完美世界', '四合院', '龙族', '海贼', '火影', '剑来', '很纯很暧昧'];
const hotList = [
  { name: '遮天', hot: '1.2w' },
  { name: '完美世界', hot: '1680' },
  { name: '火影', hot: '780' },
  { name: '四合院', hot: '780' },
  { name: '海贼', hot: '780' },
  { name: '测试最长字段测试最长字...', hot: '780' },
  { name: '很纯很暧昧', hot: '780' },
];

const handleSearch = () => {
  if (searchText.value.trim()) {
    isSearching.value = true;
    if (!history.value.includes(searchText.value)) {
      history.value.unshift(searchText.value);
    }
  }
};

const handleCancel = () => {
  if (isSearching.value) {
    isSearching.value = false;
    searchText.value = '';
  } else {
    emit('back');
  }
};

const clearHistory = () => {
  history.value = [];
};
</script>
